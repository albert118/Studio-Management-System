using StudioManagementSystem.Core.Dtos;

namespace StudioManagementSystem.Core.Entities;

public class StudentContact : Contact
{
    public StudentContact(string firstName, string lastName, string? email) : base(firstName, lastName, email)
    {
        AssignedGroup = null;
    }
    
    public StudentContact(CreateStudentContactDto dto) : base(dto.FirstName, dto.LastName, dto.Email) { }

    public Guid? AssignedGroupId { get; set; }

    public Group? AssignedGroup { get; set; }

    public GroupApplication? GroupApplication { get; set; }
}
