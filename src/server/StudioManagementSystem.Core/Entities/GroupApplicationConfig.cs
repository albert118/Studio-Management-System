using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

public class GroupApplicationConfig
{
    public void Configure(EntityTypeBuilder<GroupApplication> builder)
    {
        builder.ToTable(nameof(GroupApplication));
        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();

        builder
            .Property(e => e.Message)
            .HasDefaultValue(string.Empty)
            .IsRequired();

        builder
            .HasOne(e => e.Group)
            .WithMany(e => e.MemberApplications)
            .HasForeignKey(e => e.GroupId);

        builder
            .HasOne(e => e.StudentContact)
            .WithOne(e => e.GroupApplication)
            .HasForeignKey<GroupApplication>(e => e.StudentContactId)
            .IsRequired();
    }
}
