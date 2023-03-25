using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

public class ProjectConfig
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.ToTable(nameof(Project));

        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();

        builder.Property(e => e.Title).IsRequired();
        builder.Property(e => e.Description).IsRequired();

        builder.ConfigureMetaData().ConfigureArchivable().ConfigureMetaData().ConfigureLockable();
    }
}
