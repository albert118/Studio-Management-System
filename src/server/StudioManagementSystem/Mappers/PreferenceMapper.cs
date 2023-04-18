using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class PreferenceMapper
{
    public static GroupProjectPreference MapToGroupProjectPreference(this KeyValuePair<Guid, int> preference, Group group)
    {
        return new() {
            ProjectId = preference.Key,
            Rank = preference.Value,
            Group = group
        };
    }
}
