namespace StudioManagementSystem.Core.Dtos;

public record CreateProjectDto(string Title, string Description, List<Guid> OwnerContactIds);
