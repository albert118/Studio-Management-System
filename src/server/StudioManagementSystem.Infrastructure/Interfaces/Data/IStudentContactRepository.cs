﻿using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IStudentContactRepository
{
    Task<List<StudentContact>> GetAllStudentsAsync(CancellationToken ct);
    Task<Guid> AddStudentContactAsync(StudentContact studentContact, CancellationToken ct);
}
