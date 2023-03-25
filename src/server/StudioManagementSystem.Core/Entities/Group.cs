namespace StudioManagementSystem.Core.Entities;

public class Group : IArchivable, IMetaData, ILockable
{
    public string Name { get; set; }

    public bool IsArchived { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsLocked { get; set; }
}
