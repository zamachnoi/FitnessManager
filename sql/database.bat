@echo off
FOR /F "tokens=* delims=" %%G IN (../server/.env) DO (
    SET "line=%%G"
    IF "!line:~0,7!"=="DB_PORT=" SET "DB_PORT=!line:~7!"
    IF "!line:~0,11!"=="PG_PASSWORD=" SET "PG_PASSWORD=!line:~11!"
)

psql -h localhost -p %DB_PORT% -U postgres -d postgres -f ddl.sql
psql -h localhost -p %DB_PORT% -U postgres -d postgres -f dml.sql