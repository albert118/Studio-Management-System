using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

public class GroupProjectPreferenceConfig
{
    public void Configure(EntityTypeBuilder<GroupProjectPreference> builder)
    {
        builder.ToTable(nameof(Project));

        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();

        builder.Property(e => e.Rank).IsRequired();

        builder
            .HasOne(e => e.Project)
            .WithMany(e => e.ProjectPreferences)
            .HasForeignKey(e => e.ProjectId);

        builder
            .HasOne(e => e.Group)
            .WithMany(e => e.ProjectPreferences)
            .HasForeignKey(e => e.GroupId);
    }
}
