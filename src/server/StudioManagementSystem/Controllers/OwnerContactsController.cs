using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces;
using StudioManagementSystem.Mappers;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OwnerContactsController : ControllerBase
{
    private readonly IOwnerContactRepository _ownerContactRepository;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;

    public OwnerContactsController(IOwnerContactRepository ownerContactRepository, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _ownerContactRepository = ownerContactRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    public record OwnerContactRequest(List<Guid> Ids);

    [HttpPost]
    public ActionResult<List<OwnerDto>> GetOwners(OwnerContactRequest request)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _ownerContactRepository.GetOwnersByIdAsync(request.Ids, ct);
        task.Wait(ct);

        return task.Result.Select(p => p.MapToOwnerDto()).ToList();
    }
}
