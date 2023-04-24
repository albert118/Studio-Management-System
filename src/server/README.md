# API Backend

A .NET 6+ and EF Core backend using CLEAN architecture.

Read more about CLEAN architecture [here](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Project Structure

The project is comprised of 3 sub-projects,

-   `StudioManagementSystem`
-   `StudioManagementSystem.Core`
-   `StudioManagementSystem.Infrastructure`

The first handles interface/adaptor (API) layer concerns. This is where the .NET controllers reside, as well as the HTTP request pipeline. It is also a convenient startup project that includes Swagger.

The `Core` project is a namespace for domain data models and also doubles as the migrations project. Any domain-specific models / DTOs reside here and it is dependent on no other projects in this repo. Every other project in this repo will reference this "common" project. Adding and updating models in this project is usually accompanied by running an EF migration with either the command line or GUI tool.

The `Infrastructure` contains infrastructure layer concerns (typically database contexts or external integration for example). Communication with external data sources is implemented in this project. These implemented services are abstracted behind interfaces which are called in the API or Application (TODO, none exists yet) layer projects.

> This means it's typically easier to either adapt or swap databases down the line

## Build Process

See the dockerfile for the build pipeline. Note, the docker-compose from the root dir will mount SSL certificates that are used in the production build environment.
