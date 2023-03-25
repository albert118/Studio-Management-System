using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

public class GroupConfig
{
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.ToTable(nameof(Group).ToLowerInvariant());

        builder.Property(e => e.Name).IsRequired();

        builder.ConfigureMetaData().ConfigureArchivable().ConfigureMetaData().ConfigureLockable();
    }
}
