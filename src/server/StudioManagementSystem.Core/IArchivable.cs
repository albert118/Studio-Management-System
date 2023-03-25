namespace StudioManagementSystem.Core;

/// <summary>
/// Tags an entity as "archivable", enables soft-deletes
/// </summary>
public interface IArchivable
{
    bool IsArchived { get; set; }
}
