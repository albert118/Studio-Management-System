using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

public class GroupApplicationConfig
{

    public void Configure(EntityTypeBuilder<GroupApplication> builder)
    {
        builder.ToTable(nameof(GroupApplication));
        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();
    }
    
}