using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IStudentContactRepository
{
    Task<List<StudentContact>> GetAllStudentsAsync(CancellationToken ct);
    Task<List<StudentContact>> GetAllStudentsWithNoGroupsAsync(CancellationToken ct);
    Task<Guid> LeaveAssignedGroup(Guid id, CancellationToken ct);
    Task<Guid> AddStudentContactAsync(StudentContact studentContact, CancellationToken ct);
}
