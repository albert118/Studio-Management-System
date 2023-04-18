﻿namespace StudioManagementSystem.Core.Entities;

public class Project : IArchivable, IMetaData, ILockable
{
    public Project(string title, string description, string domain)
    {
        Title = title;
        Description = description;
        Domain = domain;
    }

    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public List<Group>? AssignedGroups { get; set; } = new();

    public List<OwnerContact>? ProductOwners { get; set; } = new();

    public Guid PrincipalOwnerId { get; set; }

    public OwnerContact PrincipalOwner { get; set; }

    public string Domain { get; set; }

    public bool IsArchived { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsLocked { get; set; }
}
