# syntax=docker/dockerfile:1

FROM mariadb:10.5.8 as database

# scripts are stored in the CWD
COPY 000-init-dependencies.sql bootstrap-nginx.sql /docker-entrypoint-initdb.d/
