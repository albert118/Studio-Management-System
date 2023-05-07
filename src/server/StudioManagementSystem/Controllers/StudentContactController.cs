using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.ProjectManagement;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentContactController : ControllerBase
{
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly IGroupManager _groupManager;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;

    public StudentContactController(IStudentContactRepository studentContactRepository, IGroupManager groupManager, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _studentContactRepository = studentContactRepository;
        _groupManager = groupManager;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }
    
    [HttpPost]
    public ActionResult<Guid> CreateStudentContact(CreateStudentContactDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _studentContactRepository.AddStudentContactAsync(new(dto), ct);
        task.Wait(ct);

        return task.Result;
    }
    
    [HttpPost("[action]/{id}")]
    [ActionName("leavegroup")]
    public ActionResult<Guid> LeaveAssignedGroup(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupManager.LeaveAssignedGroupAsync(id, ct);
        task.Wait(ct);

        return task.Result;
    }
}