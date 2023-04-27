using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class StudentContactMapper
{
    public static StudentDto MapToStudentDto(this StudentContact student)
    {
        return new(
            Id: student.Id,
            Name: $"{student.FirstName} {student.LastName}"
        );
    }
}
