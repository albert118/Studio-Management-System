using Microsoft.EntityFrameworkCore;

namespace StudioManagementSystem;

public record DatabaseSettings(string ConnectionString, MySqlServerVersion ServerVersion);
