using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class StudentContactRepository : IStudentContactRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;

    public StudentContactRepository(IStudioManagementSystemDbContextAsync smsDbContext)
    {
        _smsDbContext = smsDbContext;
    }

    public async Task<List<StudentContact>> GetAllStudentsAsync(CancellationToken ct)
    {
        var students = await _smsDbContext.StudentContacts.ToListAsync(ct);
        return students;
    }
    
    public async Task<List<StudentContact>> GetAllStudentsWithNoGroupsAsync(CancellationToken ct)
    {
        var students = await _smsDbContext.StudentContacts.Where(e=>e.AssignedGroupId == null).ToListAsync(ct);
        return students;
    }
    
    public async Task<Guid> AddStudentContactAsync(StudentContact studentContact, CancellationToken ct)
    {
        await _smsDbContext.StudentContacts.AddAsync(studentContact, ct);
        await _smsDbContext.SaveChangesAsync(ct);
        return studentContact.Id;
    }
}
