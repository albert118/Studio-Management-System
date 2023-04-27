namespace StudioManagementSystem.Core.Dtos;

public record GroupApplicationDto(
    Guid Id,
    Guid GroupId,
    Guid ContactId,
    string FirstName,
    string LastName,
    string Email,
    string Message
    );
