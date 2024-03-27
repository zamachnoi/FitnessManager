# Developer's Guide for Fitness Manager Application

This guide provides a step-by-step walkthrough for setting up the development environment, creating, and running the Fitness Manager application, including database setup, server configuration, and client application development. Specifically, we'll cover how to effectively create and manage routes within the server component.

## Prerequisites

-   Docker
-   Node.js and npm
-   PostgreSQL client tools (e.g., psql)
-   Familiarity with bash or similar shell environments

Ensure Docker and Node.js are installed on your system. Docker will be used to containerize the PostgreSQL database, and Node.js will be required for running the server and client parts of the application.

## Database Setup

1. **Launch PostgreSQL Container**

    Use Docker to run a PostgreSQL container:

    ```bash
    docker run --name pgsql-dev -e POSTGRES_PASSWORD=test -p 5432:5432 postgres
    ```

2. **Set Database Password in Environment Variables**

    To ease the connection process, set the database password as an environment variable:

    ```bash
    export PGPASSWORD=test
    ```

    For persistence across sessions, add this line to `~/.bashrc` or `~/.zshrc`.

3. **Run the DDL Script**

    Initialize the database schema:

    ```bash
    psql -h localhost -p 5432 -U postgres -d postgres -f setup.sql
    ```

## Server Configuration

### Setup

Navigate to the server directory:

```bash
cd server
```

### Installing packages

To run the server, you must have the required npm packages installed.

Run this command to install them:

```bash
npm i
```

### Building the Server for Production

Compile the server code for production deployment:

```bash
npm run build
```

### Starting the Server

Launch the server application:

```bash
npm run start
```

## Client Application Development

Navigate to the client directory and install dependencies:

```bash
cd fitness-manager
npm install
```

Start the development server:

```bash
npm run dev
```

### Development

**What is `/src` and `/dist`?**

`/src` is the TypeScript source code. All code changes go into this folder.

`/dist` is where TypeScript gets transpiled into JavaScript so that our node server can be run.

**Directory/File Usage**

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

**Route Example**

Example from: `routes/defaultRoute.ts`, `app.ts`

1. **Define Route Logic**

    - Create a new file in the `/models/io` directory to store the types the route will use (Database, API) format: `{route}Io.ts`, ex: `defaultIo.ts`

        - Define type for accessing database objects (May already exist)
          Use the type from `types.d.ts` if possible, otherwise create a new one and omit the generated attribute, and add it back as its primitive type. Name does not have to relate to the route name.

            ```js
            export type GetUserDbRow = Omit<Users, "user_id"> & {
            	user_id: number,
            }
            ```

        - Define a type for client-server communication, format: `export type {Route}{Method}ApiResponse = {}` ex:
            ```js
            export type DefaultGetApiResponse = {
            	message: string,
            }
            ```

    - Create a new file in the `/data` directory for database communication, format `{route}Data.ts`, ex `defaultData.ts`

        - Import the db object:
            ```js
            import { db } from "../lib/db"
            ```
        - Import the database type:
            ```js
            import { UserDbRow } from "../models/io/defaultIo"
            ```
        - Create a function for database CRUD with database return type: `{method}{Route}DbData` ex:
            ```js
            export async function getDefaultDbData(): Promise<UserDbRow> {}
            ```
        - Use database to CRUD see [Kysely Docs](https://kysely.dev/docs/getting-started) for more info:
            ```js
            const user = await db
            	.selectFrom("users")
            	.selectAll()
            	.executeTakeFirst()
            ```

    - Create a new file in the `/controllers` directory for client-server communication `defaultController.ts`

        - Import data and io function
        - Create a function in format: generate{Route}{Method}Response to transform the db data into the API response

        ```js
        export async function generateDefaultGetResponse(): Promise<DefaultGetApiResponse> {
        	const user = await getDefaultDbData()

        	const res = {
        		message: `Hello ${user.first_name} ${user.last_name}`,
        	}

        	return res
        }
        ```

2. **Define Route Handlers**

    - Create a new file within the `/routes` directory for your route: e.g. `defaultRoute.ts`.

    - Import the Router function from Express.
        ```js
        import { Router } from "express"
        ```
    - Import the controller from above.
        ```js
        import * as defaultController from "../controllers/defaultController"
        ```
    - Export the route and give it a name, in this case it will be defaultRoute.
        ```js
        export const defaultRoute = Router()
        ```
    - Define your route handler functions for each HTTP method in this file.

        ```js
        // GET
        defaultRoute.get("/", (req, res) => {
        	const data = await defaultController.generateDefaultGetResponse()

            res.json(data)
        })
        ```

3. **Register Routes**

    - In the main file: `app.ts`, import the route handlers you've just created.
        ```js
        import { defaultRoute } from "./routes/defaultRoute"
        ```
    - Use the express app's `.use()` method to register your routes with the name of the route:
        ```js
        app.use("/", defaultRoute)
        ```

4. **Error Handling**

    - Ensure to implement error handling within your routes. This can be done by catching exceptions and sending appropriate error messages and status codes to the client.

### Testing Routes

-   Utilize tools such as Postman or write automated tests using frameworks like Jest to test your API endpoints. Ensure they behave as expected with various inputs.

## Conclusion

Following these instructions, developers can set up the application's environment, create routes, and ensure smooth interaction between the client, server, and database. Remember to test your routes thoroughly and handle any potential errors to ensure a robust application.
