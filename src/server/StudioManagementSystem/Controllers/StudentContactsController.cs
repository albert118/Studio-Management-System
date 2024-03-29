﻿using Microsoft.AspNetCore.Mvc;
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
    private readonly IProjectGroupManager _projectGroupManager;

    public StudentContactsController(IStudentContactRepository studentContactRepository, IProjectGroupManager projectGroupManager, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _studentContactRepository = studentContactRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
        _projectGroupManager = projectGroupManager;
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
    [ActionName("withoutgroup")]
    public ActionResult<List<StudentDto>> GetStudentsWithoutGroup()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectGroupManager.GetAllStudentsWithoutGroupsAsync(ct);
        task.Wait(ct);

        if (!task.IsCompleted)
            return StatusCode(500);

        return task.Result.Select(p => p.MapToStudentDto()).ToList();
    }
}
