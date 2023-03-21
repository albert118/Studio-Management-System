# syntax=docker/dockerfile:1

FROM mariadb:10.5.8 as database

# scripts are stored in the CWD
COPY init-users.sql /docker-entrypoint-initdb.d/init-users.sql
