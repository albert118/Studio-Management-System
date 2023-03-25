namespace StudioManagementSystem.Core;

/// <summary>
/// Tags an entity as "active", allows controlling user interactions based on their frequency of use
/// </summary>
public interface IActive
{
    bool IsActive { get; set; }
}
