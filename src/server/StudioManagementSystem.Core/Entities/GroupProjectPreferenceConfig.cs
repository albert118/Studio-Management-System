using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

public class GroupProjectPreferenceConfig
{
    public void Configure(EntityTypeBuilder<GroupProjectPreference> builder)
    {
        builder.ToTable(nameof(GroupProjectPreference));

        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();
        builder.Property(e => e.Rank).IsRequired();
    }
}
