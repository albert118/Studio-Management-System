namespace StudioManagementSystem.Core.Dtos;

public record CreateGroupApplicationDto(Guid StudentContact, Guid Group, String? Messages);