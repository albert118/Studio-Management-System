using StudioManagementSystem.Core.Dtos;
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

    public static PreferenceDto MapToPreferenceDto(GroupProjectPreference preference)
    {
        return new(
            Title: preference.Project.Title,
            ProjectId: preference.ProjectId,
            Rank: preference.Rank
        );
    }
}
