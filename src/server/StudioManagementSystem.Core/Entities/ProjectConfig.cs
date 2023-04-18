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

        builder
            .HasOne(e => e.PrincipalOwner)
            .WithMany(e => e.PrincipalProjects)
            .HasForeignKey(e => e.PrincipalOwnerId)
            .IsRequired();

        builder
            .HasMany(e => e.ProductOwners)
            .WithMany(e => e.ManagedProducts)
            .UsingEntity("ProductOwnersToManagedProducts");

        builder.ConfigureMetaData().ConfigureArchivable().ConfigureMetaData().ConfigureLockable();
    }
}
