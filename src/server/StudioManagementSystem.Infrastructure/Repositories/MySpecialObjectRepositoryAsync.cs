using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.DataServices;

namespace StudioManagementSystem.Infrastructure.Repositories;

public class MySpecialObjectRepositoryAsync : IMySpecialObjectRepositoryAsync
{
    private readonly StudioManagementSystemDbContextAsync _SpecialObjectDbContext;

    public MySpecialObjectRepositoryAsync(StudioManagementSystemDbContextAsync SpecialObjectDbContext)
    {
        _SpecialObjectDbContext = SpecialObjectDbContext;
    }

    public async Task<Guid> AddMySpecialObjectAsync(string specialfield, CancellationToken ct)
    {
        var myspecialobject = new MySpecialObject()
        {
            SpecialField = specialfield
        };

        try
        {
            await _SpecialObjectDbContext.MySpecialObjects.AddAsync(myspecialobject, ct);
            await _SpecialObjectDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        { 
            return Guid.Empty;
        }

        return myspecialobject.Id;
    }
}