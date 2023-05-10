namespace StudioManagementSystem.Core.Dtos;

public record AssignStudentsToGroupDto(Guid GroupId, List<Guid> StudentIds);
