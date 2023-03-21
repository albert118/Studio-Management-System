using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace StudioManagementSystem.Core;

public class IdGenerator : ValueGenerator<Guid>
{
    public override Guid Next(EntityEntry entry) => Guid.NewGuid();

    public override bool GeneratesTemporaryValues => false;
}