export PGPASSWORD=test
psql -h localhost -p 15432 -U postgres -d postgres -f ddl.sql
psql -h localhost -p 15432 -U postgres -d postgres -f dml.sql
cd ../server
npx kysely-codegen --out-file ../server/src/models/db/types.d.ts