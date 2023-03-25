using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StudioManagementSystem.Core;

public static class EntityConfigurerExtensions
{
    public static EntityTypeBuilder<TEntity> ConfigureMetaData<TEntity>(this EntityTypeBuilder<TEntity> builder)
        where TEntity : class, IMetaData
    {
        builder.Property(e => e.UpdatedOn).HasDefaultValue(DateTime.UtcNow);
        builder.Property(e => e.CreatedOn).HasDefaultValue(DateTime.UtcNow);

        return builder;
    }

    public static EntityTypeBuilder<TEntity> ConfigureArchivable<TEntity>(this EntityTypeBuilder<TEntity> builder)
        where TEntity : class, IArchivable
    {
        builder.Property(e => e.IsArchived).HasDefaultValue(false);

        return builder;
    }

    public static EntityTypeBuilder<TEntity> ConfigureLockable<TEntity>(this EntityTypeBuilder<TEntity> builder)
        where TEntity : class, ILockable
    {
        builder.Property(e => e.IsLocked).HasDefaultValue(false);

        return builder;
    }

    public static EntityTypeBuilder<TEntity> ConfigureActive<TEntity>(this EntityTypeBuilder<TEntity> builder)
        where TEntity : class, IActive
    {
        builder.Property(e => e.IsActive).HasDefaultValue(true);

        return builder;
    }
}
