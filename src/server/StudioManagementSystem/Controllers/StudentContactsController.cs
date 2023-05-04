using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentContactsController : ControllerBase
{
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;

    public StudentContactsController(IStudentContactRepository studentContactRepository, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _studentContactRepository = studentContactRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }
    
    [Authorize]
    [HttpPost]
    public ActionResult<Guid> CreateStudentContact(CreateStudentContactDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _studentContactRepository.AddStudentContactAsync(new(dto), ct);
        task.Wait(ct);

        return task.Result;
    }

    [HttpGet]
    public ActionResult<List<StudentDto>> GetStudents()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _studentContactRepository.GetAllStudentsAsync(ct);
        task.Wait(ct);

        return task.Result.Select(p => p.MapToStudentDto()).ToList();
    }
}
