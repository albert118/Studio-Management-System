using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentContactController : ControllerBase
{
    private readonly IStudentContactRepository _ownerContactRepository;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;

    public StudentContactController(IStudentContactRepository ownerContactRepository, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _ownerContactRepository = ownerContactRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpPost]
    public ActionResult<Guid> CreateStudentContact(CreateStudentContactDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _ownerContactRepository.AddStudentContactAsync(new(dto), ct);
        task.Wait(ct);

        return task.Result;
    }
}