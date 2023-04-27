namespace StudioManagementSystem.Core.Entities;

public class GroupApplication: IMetaData
{
    public Guid Id { get; set; }
    
    public Guid GroupId { get; set; }

    public Group Group { get; set; } = null!;
    
    public Guid StudentContactId { get; set; }

    public StudentContact Contact { get; set; } = null!;
    
    public string? Message { get; set; }
    
    public DateTime UpdatedOn { get; set; }
    
    public DateTime CreatedOn { get; set; }
}
