using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class OwnerContactMapper
{
    public static OwnerDto? MapToOwnerDto(this OwnerContact? owner)
    {
        if (owner == null)
            return null;
        return new(Name: $"{owner.FirstName} {owner.LastName}");
    }
}