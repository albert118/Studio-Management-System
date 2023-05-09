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

    public async Task<Guid> AddStudentContactAsync(StudentContact studentContact, CancellationToken ct)
    {
        await _smsDbContext.StudentContacts.AddAsync(studentContact, ct);
        await _smsDbContext.SaveChangesAsync(ct);
        return studentContact.Id;
    }

    public async Task<bool> AssignStudentToGroupAsync(Guid studentId, Guid groupId, CancellationToken ct)
    {
        var student = await _smsDbContext.StudentContacts.FirstOrDefaultAsync(e => e.Id == studentId, ct);

        if (student == null) {
            return false;
        }

        student.AssignedGroupId = groupId;
        await _smsDbContext.SaveChangesAsync(ct);

        return true;
    }

    public async Task<bool> RemoveAssignedGroupAsync(Guid id, CancellationToken ct)
    {
        var returnValue = false;

        var student = await _smsDbContext.StudentContacts.FirstOrDefaultAsync(e => e.Id == id, cancellationToken: ct);
        if (student == null)
            return returnValue;

        student.AssignedGroupId = null;
        await _smsDbContext.SaveChangesAsync(ct);
        returnValue = true;

        return returnValue;
    }
    
}
