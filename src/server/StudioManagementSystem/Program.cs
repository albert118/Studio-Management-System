using StudioManagementSystem;

const string appSettingsFilePath = "appsettings.json";

// retrieve and inject the application configuration
var appConfig = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile(appSettingsFilePath)
    .Build();

// create the application
var builder = WebApplication.CreateBuilder(args);

var startup = new Startup(builder.Configuration);

// Configure the host container (Autofac) within this method
startup.ConfigureHostContainer(builder.Host, appConfig);

// Configure the global Microsoft container services
startup.ConfigureServices(builder.Services);

var app = builder.Build();

// Configure the app and web request pipeline
startup.Configure(app, builder.Environment);

app.Run();
