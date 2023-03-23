using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Infrastructure.Interfaces.DataServices;

namespace StudioManagementSystem.Infrastructure.Repositories;

public class MySpecialObjectRepositoryAsync : IMySpecialObjectRepositoryAsync
{
    private readonly MySpecialObjectDbContextAsync _SpecialObjectDbContext;

    public MySpecialObjectRepositoryAsync(MySpecialObjectDbContextAsync SpecialObjectDbContext)
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