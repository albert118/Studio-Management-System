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

    public Task<bool> AssignStudentToGroupAsync(Guid studentId, Guid groupId, CancellationToken ct) =>
        AssignStudentsToGroupAsync(new() { studentId }, groupId, ct);

    public async Task<bool> AssignStudentsToGroupAsync(List<Guid> studentIds, Guid groupId, CancellationToken ct)
    {
        var students = await _smsDbContext.StudentContacts.Where(e => studentIds.Contains(e.Id)).ToListAsync(ct);

        if (!students.Any()) {
            return false;
        }

        foreach (var student in students) {
            student.AssignedGroupId = groupId;
        }

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
