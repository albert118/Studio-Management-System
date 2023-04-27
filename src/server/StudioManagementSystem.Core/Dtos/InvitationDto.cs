namespace StudioManagementSystem.Core.Dtos;

public record InvitationDto(IEnumerable<Guid> StudentIds, Guid GroupId, string Message);
