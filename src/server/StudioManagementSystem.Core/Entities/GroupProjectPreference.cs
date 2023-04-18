namespace StudioManagementSystem.Core.Entities;

public class GroupProjectPreference
{
    public Guid Id { get; set; }

    public int Rank { get; set; }

    public Guid ProjectId { get; set; }

    public Project Project { get; set; }

    public Guid GroupId { get; set; }

    public Group Group { get; set; }
}
