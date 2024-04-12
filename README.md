# Developer's Guide for Fitness Manager Application

This guide provides a step-by-step walkthrough for setting up the development environment, creating, and running the Fitness Manager application, including database setup, server configuration, and client application development. Specifically, we'll cover how to effectively create and manage routes within the server component.

## Prerequisites

-   Docker
-   Node.js and npm
-   PostgreSQL client tools (e.g., psql)
-   Familiarity with bash or similar shell environments

Ensure Docker and Node.js are installed on your system. Docker will be used to containerize the PostgreSQL database, and Node.js will be required for running the server and client parts of the application.

## Database

### Setup

1. **Launch PostgreSQL Container**

    There are 2 choices, running the database in docker, or in the system...

    - Docker
      Use Docker to run a PostgreSQL container:

        ```bash
        docker run -d --name fitnessManager -e POSTGRES_PASSWORD=test -p 5432:5432 postgres
        ```

        If it does not work, you probably have something on port 5432, you can change the port by modifying the command like so:

        ```bash
        docker run -d --name fitnessManager -e POSTGRES_PASSWORD=test -p <port>:5432 postgres
        ```

        Replace port with the port you want to use, 15432 is a good one. Then change DB_PORT in the .env file in `/server`

    - System
      If you have postgres installed, it should already be setup.

2. **Create .env file in server**
   Create a .env file in the `server` directory with these contents

    _Change the `DB_PORT` variable to what your db port is_

    _Change the `PGPASSWORD` variable to what your db password is_

    ```.env
     PORT=3000
     DB_PORT=15432
     DATABASE_URL=postgres://postgres:test@localhost:${DB_PORT}/postgres
     SESSION_SECRET=secretkey123
     AUTH=true
     PGPASSWORD=test
    ```

3. **Run the appropriate script for your system type**

    - Linux/Mac:

    ```bash
    cd database
    bash database.sh
    ```

    - Windows

    ```
    cd database
    database.bat

    ```

## Server

### Production

1. **Navigate to the server directory**

    ```bash
    cd server
    ```

2. **Install packages**

    To run the server, you must have the required npm packages installed.

    Run this command to install them:

    ```bash
    npm i
    ```

3. **Build the server**

    Compile the server code for production deployment:

    ```bash
    npm run build
    ```

4. **Run the server**

    Launch the server application:

    ```bash
    npm run start
    ```

## Client

1. **Navigate to the client directory**
    ```bash
    cd client/fitness-manager
    ```
2. **Install all packages**
    ```bash
    npm i
    ```
3. **Start the server**
    ```bash
    npm run dev
    ```

## Development

### Understanding `/src` and `/dist`

-   `/src`: TypeScript source code. All code changes go into this folder.

-   `/dist`: Transpiled TypeScript into JavaScript. Don't modify.

### Directory/File Usage

-   `app.ts`: Main server
-   `/config`: Configuration files (e.g database config)
-   `/controllers`: Marshalling and Unmarshalling objects, errors, and output.
-   `/data`: Data Access Objects (DAOs)/CRUD operations on the database
-   `/lib`: Libraries that remain unchanged (e.g. database).
-   `/middleware`: Custom middleware (e.g. auth)
-   `/models`: Objects for communication
    -   `/models/db`: Generated database objects
    -   `/models/io`: Client-Server objects
-   `/public`: Static files (e.g. images)
-   `/routes`: HTTP Methods for a particular route
-   `/util`: utility files/functions that can be used throughout the application

### Modifying the Schema (DDL or DML)

When modifying the schema:

1. Make changes to the SQL scripts (setup.sql and dml.sql)
2. Go into database directory `cd ../database`
3. Run the script in the terminal
   Windows: `database.bat`
   Unix: `bash database.sh`

### Route Example

Example `memberHealthStats`:

1.  **Define Types**

    `/models/io/memberHealthStatsIo.ts`

    -   Import generated database type

        ```js
        import { MemberHealthStatistics } from "../db/types"
        ```

    -   Define database access type:

        Remove any templates such as `<Generated>`, or `Timestamp` (Needs to be date) from the generated type with `Omit` and add the correct type back

        ```js
        export type MemberHealthStatsData = Omit<
        MemberHealthStatistics,
        "stat_id" | "recorded"
        > & {
            stat_id: number
            recorded: Date | null
        }
        ```

    -   Define request type

        This is what the User/Client will send to the API

        ```js
        export type MemberHealthStatsApiRequest = {
            heart_rate: number
            systolic_bp: number
            diastolic_bp: number
        }
        ```

    -   Define single resource response type

        This is what the API will respond with for a single resource

        ```js
        export type MemberHealthStatsApiResponse = {
            message: string
            status: number
            data: MemberHealthStatsData | null
        }
        ```

    -   Define a many resource response type

        This is what the API will respond with for many resources

        ```js
        export type MemberHealthStatsArrayApiResponse =
            message: string
            status: number
            data: MemberHealthStatsData[] | null
        ```

2.  **Database Communication**

    `/data/memberHealthStatsData.ts`

    -   Import kysely db, data type, and request type

        ```js
        import { db } from "../lib/db"
        import {
        	MemberHealthStatsData,
        	MemberHealthStatsApiRequest,
        } from "../models/io/memberHealthStatsIo"
        ```

    -   Create your CRUD functions

        **return a `Promise` of the data type**

        For a single health resource:

        ```js
        export async function getMemberHealthStatsById(
        	memberId: number,
        	statId: number
        ): Promise<MemberHealthStatsData> {
        	const memberHealthStats = await db
        		.selectFrom("member_health_statistics")
        		.where("member_id", "=", memberId)
        		.where("stat_id", "=", statId)
        		.selectAll()
        		.executeTakeFirst()

        	if (!memberHealthStats) {
        		throw new Error("No member health stats found")
        	}

        	return memberHealthStats
        }
        ```

        For a Create/Update:

        _Request type included in arguments_

        ```js
        export async function createMemberHealthStats(
        	memberId: number,
        	stats: MemberHealthStatsApiRequest
        ): Promise<MemberHealthStatsData> {
        	const { heart_rate, systolic_bp, diastolic_bp } = stats
        	const recorded = new Date().toISOString()
        	const memberHealthStats = await db
        		.insertInto("member_health_statistics")
        		.values({
        			member_id: memberId,
        			heart_rate,
        			systolic_bp,
        			diastolic_bp,
        			recorded,
        		})
        		.returningAll()
        		.executeTakeFirst()

        	if (!memberHealthStats) {
        		throw new Error("Failed to create member health stats")
        	}

        	return memberHealthStats
        }
        ```

3.  **Transform Database to API**

    `/controllers/memberHealthStatsController.ts`

    -   Import request, responses, and database functions

        ```js
        import {
        	MemberHealthStatsApiRequest,
        	MemberHealthStatsApiResponse,
        	MemberHealthStatsArrayApiResponse,
        } from "../models/io/memberHealthStatsIo"
        import * as memberHealthStatsData from "../data/memberHealthStatsData"
        ```

    -   Create functions to translate data to api response

        This gets the array of stats, and returns a `Promise` of the Response Type

        ```js
        export async function generateMemberHealthStatsGetByIdResponse(
        	member_id: number,
        	stat_id: number
        ): Promise<MemberHealthStatsApiResponse> {
        	try {
        		const memberHealthStats =
        			await memberHealthStatsData.getMemberHealthStatsById(
        				member_id,
        				stat_id
        			)
        		let res: MemberHealthStatsApiResponse = {
        			message: `success`,
        			status: 200,
        			data: memberHealthStats,
        		}
        		return res
        	} catch (e) {
        		return {
        			message: "Could not find member health stats",
        			status: 404,
        			data: null,
        		}
        	}
        }
        ```

4.  **Create Route for Client-Server Communication**

    `routes/memberHealthStatsRoute.ts`

    -   Import router and controller

        ```js
        import { Router } from "express"
        import * as memberHealthStatsController from "../controllers/memberHealthStatsController"
        ```

    -   Export a new router

        ```js
        export const memberHealthStatsRoute = Router()
        ```

    -   Use that router to create endpoints

        ```js
        memberHealthStatsRoute.get(
        	"/:memberId/stats/:statId",
        	async (req, res) => {
        		const memberId = parseInt(req.params.memberId)
        		const statId = parseInt(req.params.statId)
        		const data =
        			await memberHealthStatsController.generateMemberHealthStatsGetByIdResponse(
        				memberId,
        				statId
        			)

        		res.status(data.status).json(data)
        	}
        )
        ```

5.  **Add Route to Application Code**

    `app.ts`

    -   Import the route

        ```js
        import { memberHealthStatsRoute } from "./routes/memberHealthStatsRoute"
        ```

    -   Enable route

        ```js
        app.use("/members", memberHealthStatsRoute)
        ```

### Conclusion

Following these instructions, developers can set up the application's environment, create routes, and ensure smooth interaction between the client, server, and database. Remember to test your routes thoroughly and handle any potential errors to ensure a robust application.

## Client

Navigate to the client directory and install dependencies:

```bash
cd fitness-manager
npm install
```

Start the development server:

```bash
npm run dev
```
