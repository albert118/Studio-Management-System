using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.DataServices;

public interface IStudioManagementSystemDbContextAsync
{
    DbSet<MySpecialObject> MySpecialObjects { get; }
    DbSet<Contact> Contacts { get; }
    DbSet<Group> Groups { get; }
    DbSet<Project> Projects { get; }
    
    Task<int> SaveChangesAsync(CancellationToken ct);
}