﻿using StudioManagementSystem.Core.Dtos;

namespace StudioManagementSystem.Core.Entities;

public class Group : IArchivable, IMetaData, ILockable
{
    public Group(string name)
    {
        Name = name;
        Members = new();
        MaxMembers = 2;
    }

    public Group(CreateGroupDto dto)
    {
        Name = dto.Name;
        Members = new();
        MaxMembers = dto.MaxMembers;

        // TODO: migration for new fields
        // Description = dto.Description;
        // Preferences = dto.Preferences;
    }

    public Guid Id { get; set; }

    public Project? AssignedProject { get; set; }

    public string Name { get; set; }

    public bool IsArchived { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsLocked { get; set; }

    public int MaxMembers { get; set; }

    public List<StudentContact> Members { get; set; }
}
