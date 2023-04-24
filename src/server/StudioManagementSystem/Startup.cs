using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;


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
        // Add authentication.
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "supabase",
                    ValidAudience = "authenticated",
                    // to fix later
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Pxje6J28POZQlq+nZNdNUzg7N/vBfwNb+U+dcthqKY1/5G6XqyEs1HZMSv6hhY8xhDQtHkc/+pt0cosGlgpfXQ==")),
                    ClockSkew = TimeSpan.Zero
                };
            });
        
        services.AddControllers();

        services.Configure<RouteOptions>(options => {
            options.LowercaseUrls = true;
            options.LowercaseQueryStrings = true;
        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Studio Management Subject", Version = "v1" });

            // Define the security scheme
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer"
            });

            // Define the security requirement
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });    
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
                .UseDeveloperExceptionPage();
        }
        else {
            // Enable the exception handler route
            app.UseExceptionHandler("/error")
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                .UseHsts()
                .UseHttpsRedirection();
        }

        app.UseAuthentication();
        app.UseCors();
        app.MapControllers();
    }
}
