## Server

`node app.js`

## Client

```js
  cd fitness-manager
  npm install
  npm run dev
```

## Database

```bash
docker run \                                                                                                                                                    ✘ INT  base  09:42:30 PM
  --name pgsql-dev \
  -e POSTGRES_PASSWORD=test \
  -p 5432:5432 postgres
```

```bash
export PGPASSWORD=test
psql -h localhost -p 5432 -U postgres -d postgres -f setup.sql
```

## API

```bash
cd server
```

### Dev

```bash
npm run dev
```

### Build

```bash
npm run build
npm run start
```
