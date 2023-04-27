using StudioManagementSystem.Core.Dtos;

namespace StudioManagementSystem.Core.Entities;

public class Group : IArchivable, IMetaData, ILockable
{
    public Group(string name)
    {
        Name = name;
        MaxMembers = 2;
        Description = string.Empty;
    }

    public Group(CreateGroupDto dto)
    {
        Name = dto.Name;
        MaxMembers = dto.MaxMembers;
        Description = dto.Description ?? string.Empty;
    }

    public Group(UpdateGroupDto dto)
    {
        Name = dto.Name;
        MaxMembers = dto.MaxMembers;
        Description = dto.Description;
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

    public ICollection<GroupApplication> MemberApplications { get; set; } = new List<GroupApplication>();

    public ICollection<StudentContact> Members { get; set; } = new List<StudentContact>();

    public ICollection<GroupProjectPreference> GroupProjectPreferences { get; set; } = new List<GroupProjectPreference>();
}
