namespace StudioManagementSystem;

/// <summary>
/// Tag a service implementation for registration as an instance scoped service
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
// ReSharper disable once ClassNeverInstantiated.Global
public class InstanceScopedBusinessServiceAttribute : Attribute {}
