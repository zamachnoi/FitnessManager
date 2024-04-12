source ../server/.env
export PGPASSWORD=$PGPASSWORD
psql -h localhost -p $DB_PORT -U postgres -d postgres -f ddl.sql
psql -h localhost -p $DB_PORT -U postgres -d postgres -f dml.sql