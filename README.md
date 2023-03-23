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

The database data is stored as a Docker volume local to your machine. All important domain data, user accounts, etc. are stored on this volume. **If you remove this volume you will incur dataloss**. Building the stack will not replace/remove these volumes. ie. you can run `docker-compose build` without incurring dataloss.

### Running the Migrations

Having started up the docker dependencies, let's run the migrations.

_TODO (basically use the ef core tools in your editor or `dotnet ef` on the CLI to update the database)._

## Using the Reverse Proxy (Nginx Proxy Manager)

We use Nginx Proxy Manager (aka. NPM for short - very confusing I know). This image has a web UI for configuring it easily.

> [🔗 Checkout Nginx Proxy Manager's site for more details and docs](https://nginxproxymanager.com/)

Credentials are distributed over a secure channel (currently MS Teams) on as-needed basis.

For production, our SPA (React) is compiled into static files and served directly by the proxy.

The nginx config for this lives at `nginx/default_host/site.conf`. The Dockerfile build process will copy the SPA static content to nginx at `/usr/share/nginx/html`.

Custom services, dashboards, special auth requirements, streams, 404 hosts etc. can be easily added via the nginx GUI. Visit http://localhost:81 and login with provided admin credentials to configure.

> This admin dashboard is not currently configured to be exposed securely over a public domain! Do so with appropriate measures if required.

> The admin dashboard also provides an interface to add SSL configuration and certs

## Accessing the Database for Development Purposes

In development mode, the MariaDb database is exposed via port `33060`. The various user credentials are currently under the `database/` directory in this repo.

## Running and deploying the Production Build

Running `docker-compose build && docker-compose up -d` will build the latest source code and deploy it behind our rerverse proxy. This proxy will run on completion and make the build available at https://localhost
