namespace StudioManagementSystem.Core.Entities;

public class GroupApplication: IMetaData
{
    public Guid Id { get; set; }
    
    public Guid GroupId { get; set; }

    public Group Group { get; set; } = null!;
    
    public Guid StudentContactId { get; set; }

    public StudentContact StudentContact { get; set; } = null!;

    public string Message { get; set; } = string.Empty;
    
    public DateTime UpdatedOn { get; set; }
    
    public DateTime CreatedOn { get; set; }
}
