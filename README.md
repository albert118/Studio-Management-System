## Nginx Proxy Manager

# Studio Management System

## Getting Started

To startup the app in dev mode we need to setup Docker, run `docker-compose`, and apply our migrations.

### Docker

Ensure you have docker and docker-compose installed. See [Get Docker](https://docs.docker.com/get-docker/) for you device.

Having installed Docker (and potentially restarted editors, installed extensions, etc.), let's start up the application stack in dev mode.

In a console run the following,

```
docker-compose up
```

This will build the application stack for the first time and start up the apps in dev mode. This includes,

-   the database (MariaDb)
-   a reverse proxy (Nginx Proxy Manager)
-   an SPA frontend (React Js)

### Running the Migrations

Having started up the docker dependencies, let's run the migrations.

_TODO (basically use the ef core tools in your editor or `dotnet ef` on the CLI to update the database)._

## Using the Reverse Proxy

We use Nginx (NPM for short - very confusing I know). This image has a web UI for configuring it easily.
Credentials are distributed over a secure channel (currently MS Teams) on as-needed basis.

For production, our SPA (React) is compiled into static files and served directly by the proxy.

## Accessing the Database for Development Purposes

In development mode, the MariaDb database is exposed via port `33060`. The various user credentials are currently under the `database/` directory in this repo.
