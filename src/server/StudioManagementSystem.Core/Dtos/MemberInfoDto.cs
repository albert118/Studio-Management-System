namespace StudioManagementSystem.Core.Dtos;

public record MemberInfoDto(int Max, int Count, List<GroupMemberDto> Members);