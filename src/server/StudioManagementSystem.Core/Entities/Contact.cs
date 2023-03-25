namespace StudioManagementSystem.Core.Entities;

public class Contact : IArchivable, IMetaData, IActive
{
    public Contact(string firstName, string lastName, string? email)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }

    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string? Email { get; set; }

    public bool IsArchived { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsActive { get; set; }
}
