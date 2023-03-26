using Autofac;
using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Infrastructure;
using StudioManagementSystem.Infrastructure.DataServices;

namespace StudioManagementSystem;

public static class EfContextRegistrationExtensions
{
    /// <summary>
    /// Add the application layer services
    /// </summary>
    /// <param name="containerBuilder"></param>
    /// <returns></returns>
    public static ContainerBuilder AddApplicationServices(this ContainerBuilder containerBuilder)
    {
        containerBuilder
            .RegisterType<CancellationTokenAccessor>()
            .As<ICancellationTokenAccessor>()
            .InstancePerLifetimeScope();

        containerBuilder.RegisterAttributeTaggedServices<InstanceScopedServiceAttribute>();
        containerBuilder.RegisterAttributeTaggedServices<InstanceScopedBusinessServiceAttribute>();

        return containerBuilder;
    }

    /// <summary>
    /// Register any services tagged with the instance registration attribute
    /// </summary>
    /// <param name="assembly">The assembly to search (passing the tag's assembly is an easy start)</param>
    /// <seealso cref="InstanceScopedServiceAttribute"/>
    private static ContainerBuilder RegisterAttributeTaggedServices<T>(this ContainerBuilder containerBuilder)
        where T : Attribute
    {
        containerBuilder.RegisterAssemblyTypes(typeof(T).Assembly)
            .Where(type => type.GetCustomAttributes(typeof(T), inherit: false).Any())
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        return containerBuilder;
    }

    /// <summary>
    /// Add the relevant EF Core db contexts
    /// </summary>
    public static ContainerBuilder AddEfCoreDbContexts(this ContainerBuilder builder)
    {
        return builder.AddStudioManagementSystemDbContext();
        // return builder.AddMySpecialDbContext();
    }

    /// <summary>
    /// Configure the ef core database (sets the db connection string)
    /// </summary>
    public static ContainerBuilder AddDatabaseSettings(this ContainerBuilder containerBuilder, IConfiguration config)
    {
        var databaseSettings = new DatabaseSettings(
            config.GetConnectionString("StudioManagementDbConnection")!,
            new(new Version(
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMajor").Value!),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionMinor").Value!),
                int.Parse(config.GetSection("ConnectionStrings:ServerVersionBuild").Value!)
            ))
        );

        containerBuilder.RegisterInstance(databaseSettings).AsSelf().SingleInstance();

        return containerBuilder;
    }

    private static ContainerBuilder AddDbContextOptions<TContext>(this ContainerBuilder containerBuilder)
        where TContext : DbContext
    {
        containerBuilder.Register(sp => {
                var loggerFactory = sp.Resolve<ILoggerFactory>();
                var dbSettings = sp.Resolve<DatabaseSettings>();
                return new DbContextOptionsBuilder<TContext>()
                    .UseLoggerFactory(loggerFactory)
                    .UseMySql(dbSettings.ConnectionString, dbSettings.ServerVersion)
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging()
                    .Options; // make sure to return options here! Otherwise we'll register the builder
            })
            .AsSelf()
            .SingleInstance();

        return containerBuilder;
    }
    
     private static ContainerBuilder AddStudioManagementSystemDbContext(this ContainerBuilder builder)
     {
         builder
             .AddDbContextOptions<StudioManagementSystemDbContextAsync>()
             .RegisterType<StudioManagementSystemDbContextAsync>()
             .As<IStudioManagementSystemDbContextAsync>()
             .InstancePerLifetimeScope();
         
         return builder;
     }

    // Example DI for a database context
    // private static ContainerBuilder AddMySpecialDbContext(this ContainerBuilder builder)
    // {
    //     builder
    //         .AddDbContextOptions<MySpecialDbContext>()
    //         .RegisterType<MySpecialDbContext>()
    //         .As<IMySpecialDbContext>()
    //         .InstancePerLifetimeScope();
    //
    //     return builder;
    // }
}
