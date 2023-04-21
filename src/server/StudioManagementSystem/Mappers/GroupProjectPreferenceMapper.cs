using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class GroupProjectPreferenceMapper
{
    public static GroupProjectPreference MapToGroupProjectPreference(KeyValuePair<Guid, int> preference)
    {
        return new() {
            Rank = preference.Value,
            ProjectId = preference.Key
        };
    }
}
