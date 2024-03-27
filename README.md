# Database

`cd database`

### Creating a database

**Make sure [Docker](https://www.docker.com/products/docker-desktop/#) is installed**

```bash
docker run \
--name pgsql-dev \
-e POSTGRES_PASSWORD=test \
-p 5432:5432 postgres
```

### Set your database password in the environment variables

```bash
export PGPASSWORD=test
```

_This can also be set in `~/.bashrc` or `~/.zshrc`_

### Run the DDL script

```bash
psql -h localhost -p 5432 -U postgres -d postgres -f setup.sql
```

# Server

`cd server`

## Production

### Building the server:

`npm run build`

### Starting the server

`npm run start`

### Creating Routes

# Client

```bash
  cd fitness-manager
  npm install
  npm run dev
```
