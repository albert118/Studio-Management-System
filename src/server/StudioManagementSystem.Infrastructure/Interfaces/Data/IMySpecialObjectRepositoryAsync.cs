namespace StudioManagementSystem.Infrastructure.Interfaces.DataServices;

public interface IMySpecialObjectRepositoryAsync
{
    Task<Guid> AddMySpecialObjectAsync(string specialField, CancellationToken ct);
    
    
}
