export PGPASSWORD=test
psql -h localhost -p 5432 -U postgres -d postgres -f setup.sql
psql -h localhost -p 5432 -U postgres -d postgres -f dml.sql
cd ../server
npx kysely-codegen --out-file ../server/src/models/db/types.d.ts