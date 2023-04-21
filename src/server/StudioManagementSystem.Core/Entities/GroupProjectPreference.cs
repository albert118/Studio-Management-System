namespace StudioManagementSystem.Core.Entities;

public class GroupProjectPreference
{
    public GroupProjectPreference(KeyValuePair<Guid, int> preference)
    {
        Rank = preference.Value;
        ProjectId = preference.Key;
    }

    public Guid Id { get; set; }

    public int Rank { get; set; }

    public Guid ProjectId { get; set; }

    public Project Project { get; set; } = null!;

    public Guid GroupId { get; set; }

    public Group Group { get; set; } = null!;
}
