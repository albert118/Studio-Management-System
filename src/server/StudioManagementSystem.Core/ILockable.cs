namespace StudioManagementSystem.Core;

/// <summary>
/// denotes an entity as "locked/unlocked" to editing by non-admin users
/// </summary>
public interface ILockable
{
    bool IsLocked { get; set; }
}
