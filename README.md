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
Credentials are

```
fullname: SmsAdministrator
Nickname: smsAdmin
email: studio-management-system-admin@notreal.dev
```

password is distributed over a secure channel (currently MS Teams) on as-needed basis.
