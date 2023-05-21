using Microsoft.EntityFrameworkCore;
using StudioManagementSystem;
using StudioManagementSystem.Core;

// retrieve and inject the application configuration
var appConfig = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
    .Build();

// create the application
var builder = WebApplication.CreateBuilder(args);

var startup = new Startup(builder.Configuration);

// Configure the host container (Autofac) within this method
startup.ConfigureHostContainer(builder.Host, appConfig);

// Configure the global Microsoft container services
startup.ConfigureServices(builder.Services, builder.Environment);

var app = builder.Build();

// Configure the app and web request pipeline
startup.Configure(app, builder.Environment);

// development envs should run migrations manually, as needed (speeds up launch time for dev's)
if (!builder.Environment.IsDevelopment()) {
    using var scope = app.Services.CreateScope();
    var migrationDbContext = scope.ServiceProvider.GetRequiredService<StudioManagementDbMigrationContext>();
    migrationDbContext.Database.Migrate();
}

app.Run();
