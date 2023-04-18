using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OwnerContactController : ControllerBase
{
    private readonly IOwnerContactRepository _ownerContactRepository;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;

    public OwnerContactController(IOwnerContactRepository ownerContactRepository, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _ownerContactRepository = ownerContactRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpPost]
    public ActionResult<Guid> CreateOwnerContact(CreateOwnerContactDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _ownerContactRepository.AddOwnerContactAsync(new(dto), ct);
        task.Wait(ct);

        return task.Result;
    }
}
