using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace StudioManagementSystem.Core;

public class StudioManagementDbMigrationContextFactory : IDesignTimeDbContextFactory<StudioManagementDbMigrationContext>
{
    // Holds migration infrastructure settings
    private const string AppSettingsFilePath = "appsettings.json";

    public StudioManagementDbMigrationContext CreateDbContext(string[] args)
    {
        Console.WriteLine("created db context");
        return new(GetDbContextOptions());
    }

    public static DbContextOptions<StudioManagementDbMigrationContext> GetDbContextOptions()
    {
        Console.WriteLine("Starting migrations...");

        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(AppSettingsFilePath)
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
            .Build();

        var connectionString = configuration.GetConnectionString("StudioManagementDbConnection");

        Console.WriteLine($"Attempting to run migrations with connection: '{connectionString}'");

        var majorVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionMajor").Value!);
        var minorVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionMinor").Value!);
        var buildVersion = int.Parse(configuration.GetSection("ConnectionStrings:ServerVersionBuild").Value!);

        var serverVersion = new MySqlServerVersion(new Version(majorVersion, minorVersion, buildVersion));

        var dbContextBuilder =
            new DbContextOptionsBuilder<StudioManagementDbMigrationContext>().UseMySql(connectionString!, serverVersion);

        Console.WriteLine("created db context options");

        return dbContextBuilder.Options;
    }
}
