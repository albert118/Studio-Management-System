using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Core.Dtos;

public record GroupApplicationDto(
    Guid Id,
    Guid GroupId,
    Guid ContactId,
    String FirstName,
    String LastName,
    String Email,
    String Message
    );