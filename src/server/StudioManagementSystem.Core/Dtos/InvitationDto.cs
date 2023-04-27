using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Core.Dtos;

public record InvitationDto(IEnumerable<Guid> StudentIds, Guid GroupId, String Message);