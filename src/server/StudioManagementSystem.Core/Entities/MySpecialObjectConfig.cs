using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Migrations.Internal;

namespace StudioManagementSystem.Core.Entities;

public class MySpecialObjectConfig
{
    public void Configure(EntityTypeBuilder<MySpecialObject> builder)
    {
        builder.ToTable(nameof(MySpecialObject));
        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();
        builder.Property(e => e.SpecialField).IsRequired();
    }
}