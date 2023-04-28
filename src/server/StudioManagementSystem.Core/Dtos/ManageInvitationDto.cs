namespace StudioManagementSystem.Core.Dtos;

public record ManageInvitationDto(IEnumerable<Guid> Ids, bool Status);