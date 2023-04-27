using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class StudentContactRepository : IStudentContactRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly ILogger<StudentContactRepository> _logger;

    public StudentContactRepository(IStudioManagementSystemDbContextAsync smsDbContext, ILogger<StudentContactRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _logger = logger;
    }

    public Task<List<StudentContact>> GetStudentsByIdAsync(IEnumerable<Guid> studentContactIds, CancellationToken ct)
    {
        var students = _smsDbContext.StudentContacts.Where(c => studentContactIds.Contains(c.Id)).ToListAsync(ct);
        return students;
    }
    
    public Task<StudentContact?> GetStudentByIdAsync(Guid studentContactIds, CancellationToken ct)
    {
        var student = _smsDbContext.StudentContacts.FirstOrDefaultAsync(g => g.Id == studentContactIds, ct);
        return student;
    }

    public async Task<Guid> AddStudentContactAsync(StudentContact studentContact, CancellationToken ct)
    {
        await _smsDbContext.StudentContacts.AddAsync(studentContact, ct);
        await _smsDbContext.SaveChangesAsync(ct);
        return studentContact.Id;
    }
}