namespace StudioManagementSystem.Core.Entities;

public class Project : IArchivable, IMetaData, ILockable
{
    public Project(string title, string description, string domain, Guid principalOwnerId)
    {
        Title = title;
        Description = description;
        Domain = domain;
        PrincipalOwnerId = principalOwnerId;
    }

    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public List<Group>? AssignedGroups { get; set; } = new();

    public List<OwnerContact>? ProductOwners { get; set; } = new();

    public Guid PrincipalOwnerId { get; set; }

    // this property is initialised by the repository after we assert a valid principal owner ID was passed for assignment
    public OwnerContact PrincipalOwner { get; set; } = null!;

    public ICollection<GroupProjectPreference> ProjectPreferences { get; set; } = new List<GroupProjectPreference>();

    public string Domain { get; set; }

    public bool IsArchived { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsLocked { get; set; }
}
