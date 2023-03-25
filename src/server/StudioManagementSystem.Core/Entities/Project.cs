namespace StudioManagementSystem.Core.Entities;

public class Project : IArchivable, IMetaData, ILockable
{
    public Project(string title, string description)
    {
        Title = title;
        Description = description;
        ProductOwners = null;
        AssignedGroups = null;
    }

    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public ICollection<Group>? AssignedGroups { get; set; }

    public ICollection<OwnerContact>? ProductOwners { get; set; }

    public bool IsArchived { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsLocked { get; set; }
}
