# syntax=docker/dockerfile:1.4

## backend API (.NET)

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:6.0 AS base

WORKDIR /src
COPY . ./
RUN dotnet restore

FROM base as builder

COPY . .
RUN dotnet build -c Release -o /build

FROM builder as publisher

RUN dotnet publish -c Release -o /publish

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app
COPY --from=publisher /publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT dotnet StudioManagementSystem.dll