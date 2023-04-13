using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class MemberMapper
{
    public static MemberInfoDto ToMemberInfoDto(this List<StudentContact> members)
    {
        return new MemberInfoDto(
            Max: 100,
            Count: members.Count,
            Members: members.Select(m => m.ToGroupMemberDto()).ToList()
        );
    }

    public static GroupMemberDto ToGroupMemberDto(this StudentContact member)
    {
        return new GroupMemberDto(
            Name: $"{member.FirstName} {member.LastName}"
        );
    }
}
