namespace StudioManagementSystem.Core.Dtos;

public record GroupDto(string Name, string Description, List<GroupMemberDto> Members);