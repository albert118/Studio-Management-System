using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class MemberMapper
{
    public static MemberInfoDto ToMemberInfoDto(this IEnumerable<StudentContact> members, Group group)
    {
        var studentContacts = members as StudentContact[] ?? members.ToArray();

        return new(
            Max: group.MaxMembers,
            Count: studentContacts.Length,
            Members: studentContacts.Select(m => m.ToGroupMemberDto()).ToList()
        );
    }

    public static GroupMemberDto ToGroupMemberDto(this StudentContact member)
    {
        return new(
            Id: member.Id,
            Name: $"{member.FirstName} {member.LastName}"
        );
    }
}
