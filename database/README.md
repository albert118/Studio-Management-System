# Bootstraping Databases

Part of the root Dockerfile build process requires that databases exist and some data is bootstrapped before building and deploying the production SPA. The following scripts are executing in alphanumeric order.

-   `000-init-dependencies.sql` adds databases and known users,
-   `bootstrap-nginx.sql` bootstraps the admin tool and revproxy with minimal data from a slimmed down database dump

To update the minimal bootstrap of the nginx proxy manager, execute this command inside the (running) maria-db container,

```sh
# inside the database container, execute the following and copy the output file as needed
# remember to substiture the root password as required
exec mariadb-dump --all-databases -uroot -p"super_secret_root_password" > db-dump.sql
```

Copy and slim down this dump as required!

> Beware! This will dump ALL databases in the instance. For now, this isn't an issue because we have a small set of database. This should be updated in the future as the databases grow

# Creating Backups

To create backups, checkout the docs from [mariadb](https://hub.docker.com/_/mariadb)
