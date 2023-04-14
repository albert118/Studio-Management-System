using StudioManagementSystem.Core.Dtos;

namespace StudioManagementSystem.Core.Entities;

public class Group : IArchivable, IMetaData, ILockable
{
    public Group(string name)
    {
        Name = name;
        Members = new();
        MaxMembers = 2;
        Description = string.Empty;
    }

    public Group(CreateGroupDto dto)
    {
        Name = dto.Name;
        Members = new();
        MaxMembers = dto.MaxMembers;
        Description = dto.Description ?? string.Empty;

        // TODO: migration for new field
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

    public string Description { get; set; }

    public List<StudentContact> Members { get; set; }
}
