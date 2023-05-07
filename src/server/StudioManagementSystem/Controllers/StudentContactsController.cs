using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;
using StudioManagementSystem.ProjectManagement;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentContactsController : ControllerBase
{
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IGroupManager _groupManager;

    public StudentContactsController(IStudentContactRepository studentContactRepository, IGroupManager groupManager, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _studentContactRepository = studentContactRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
        _groupManager = groupManager;
    }

    [HttpGet]
    public ActionResult<List<StudentDto>> GetStudents()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _studentContactRepository.GetAllStudentsAsync(ct);
        task.Wait(ct);
        
        if (!task.IsCompleted)
            return StatusCode(500);
        
        return task.Result.Select(p => p.MapToStudentDto()).ToList();
    }
    
    [HttpGet("[action]")]
    [ActionName("unassignedgroup")]
    public ActionResult<List<StudentDto>> GetStudentsWithNoGroup()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupManager.GetAllStudentsWithNoGroupsAsync(ct);
        task.Wait(ct);
        
        if (!task.IsCompleted)
            return StatusCode(500);

        return task.Result.Select(p => p.MapToStudentDto()).ToList();
    }
}
