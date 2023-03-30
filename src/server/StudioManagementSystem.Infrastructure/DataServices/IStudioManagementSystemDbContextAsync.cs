using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.DataServices;

public interface IStudioManagementSystemDbContextAsync
{
    DbSet<Contact> Contacts { get; }
    DbSet<OwnerContact> OwnerContacts { get; }
    DbSet<StudentContact> StudentContacts { get; }
    DbSet<Group> Groups { get; }
    DbSet<Project> Projects { get; }
    
    Task<int> SaveChangesAsync(CancellationToken ct);
}
