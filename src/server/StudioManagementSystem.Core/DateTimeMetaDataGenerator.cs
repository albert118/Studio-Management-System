using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace StudioManagementSystem.Core;

public class DateTimeMetaDataGenerator : ValueGenerator<DateTime>
{
    public override DateTime Next(EntityEntry entry) => DateTime.UtcNow;

    public override bool GeneratesTemporaryValues => false;
}
