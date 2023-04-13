using Autofac;
using Autofac.Extensions.DependencyInjection;

namespace StudioManagementSystem;

public class Startup
{
    private IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    /// <summary>
    /// Add and configure services for the container
    /// </summary>
    /// <param name="services"></param>
    public void ConfigureServices(IServiceCollection services, IWebHostEnvironment env)
    {
        services.AddControllers();

        services.Configure<RouteOptions>(options => {
            options.LowercaseUrls = true;
            options.LowercaseQueryStrings = true;
        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        if (env.IsDevelopment()) {
            services.AddCors(options => {
                options.AddDefaultPolicy(policy => policy
                    .WithOrigins("http://127.0.0.1:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                );
            });
        }
    }

    /// <summary>
    /// Configure the Autofac container
    /// </summary>
    public void ConfigureHostContainer(ConfigureHostBuilder hostBuilder, IConfiguration config)
    {
        hostBuilder.UseServiceProviderFactory(new AutofacServiceProviderFactory());

        hostBuilder.ConfigureContainer<ContainerBuilder>(containerBuilder => {
            containerBuilder
                .AddDatabaseSettings(config)
                .AddEfCoreDbContexts()
                .AddApplicationServices();
        });
    }

    /// <summary>
    /// Configure the webapplication depending on the environment
    /// </summary>
    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment()) {
            app.UseSwagger()
                .UseSwaggerUI()
                .UseDeveloperExceptionPage()
                .UseCors();
        }
        else {
            // Enable the exception handler route
            app.UseExceptionHandler("/error")
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                .UseHsts();
        }

        app.UseHttpsRedirection();

        app.MapControllers();
    }
}
