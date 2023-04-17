namespace StudioManagementSystem.Core.Dtos;

public record CreateProjectDto(
    string Title,
    string Description,
    string Domain,
    Guid PrincipalOwnerContactId,
    List<Guid> OwnerContactIds
);
