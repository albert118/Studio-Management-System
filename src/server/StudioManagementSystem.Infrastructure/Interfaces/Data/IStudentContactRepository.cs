using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IStudentContactRepository
{
    Task<List<StudentContact>> GetStudentsByIdAsync(IEnumerable<Guid> studentContactIds, CancellationToken ct);
    Task<Guid> AddStudentContactAsync(StudentContact studentContact, CancellationToken ct);
}