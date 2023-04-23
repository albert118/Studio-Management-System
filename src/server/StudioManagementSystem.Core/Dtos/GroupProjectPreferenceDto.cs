namespace StudioManagementSystem.Core.Dtos;

public record GroupProjectPreferenceDto(Guid? PreferenceOne, Guid? PreferenceTwo, Guid? PreferenceThree)
{
    private readonly Guid?[] _rankedPreferences = {
        PreferenceOne,
        PreferenceTwo,
        PreferenceThree
    };

    public IEnumerable<KeyValuePair<Guid, int>> PreferencesAsList()
    {
        return _rankedPreferences
            .Select((preferenceId, index) => new KeyValuePair<Guid, int>(preferenceId ?? Guid.Empty, index + 1))
            .Where(kvp => kvp.Key != Guid.Empty);
    }
}
