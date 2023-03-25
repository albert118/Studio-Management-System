namespace StudioManagementSystem.Core;

/// <summary>
/// Tags an entity with "meta data fields". These are common data fields, such as UpdateOn
/// </summary>
public interface IMetaData
{
    DateTime UpdatedOn { get; set; }

    DateTime CreatedOn { get; set; }
}
