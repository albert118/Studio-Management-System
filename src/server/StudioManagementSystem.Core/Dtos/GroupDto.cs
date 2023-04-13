namespace StudioManagementSystem.Core.Dtos;

public record GroupDto(Guid Id, string Name, string Description, List<GroupMemberDto> Members);
