using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core.Entities;

// Contact is the base class in a hierarchy disjoint contact types (student, owner)
// this implements the hierarchy as a TPH pattern, TPT is an alternative but often has worse performance (see here: https://learn.microsoft.com/en-us/ef/core/performance/modeling-for-performance#inheritance-mapping)
// see: https://learn.microsoft.com/en-us/ef/core/modeling/inheritance for more on the pattern and EF Core's implementation
public class ContactConfig
{
    public void Configure(EntityTypeBuilder<Contact> builder)
    {
        builder.ToTable(nameof(Contact).ToLowerInvariant());

        // enable TPH strategy and label our discriminator
        builder.HasDiscriminator<string>("contact_type")
            .HasValue<StudentContact>(nameof(StudentContact).ToLowerInvariant())
            .HasValue<OwnerContact>(nameof(OwnerContact).ToLowerInvariant());

        builder.Property(e => e.Id).HasValueGenerator<IdGenerator>();

        builder.Property(e => e.FirstName).IsRequired();
        builder.Property(e => e.LastName).IsRequired();

        builder.Property(e => e.IsActive).HasDefaultValue(false);

        builder.Property(e => e.IsArchived).HasDefaultValue(false);

        builder.Property(e => e.UpdatedOn).HasDefaultValue(DateTime.UtcNow);
        builder.Property(e => e.CreatedOn).HasDefaultValue(DateTime.UtcNow);
    }
}
