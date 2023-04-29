namespace StudioManagementSystem.Core.Dtos;

public record GroupApplicationDto(
    Guid Id,
    Guid GroupId,
    Guid ContactId,
    string Name,
    string Message
);
