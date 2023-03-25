﻿namespace StudioManagementSystem.Core.Entities;

public class OwnerContact : Contact
{
    public OwnerContact(string firstName, string lastName, string? email) : base(firstName, lastName, email)
    {
        ManagedProjects = null;
    }

    /// <summary>
    /// denotes the Studio (subject) allocation an owner is in (eg. Apps, Studio, Prof)
    /// </summary>
    /// currently, there is a rough format for this on Canvas. We just need a way to discriminate for
    /// admin views. So, there's flexibility here
    public string? StudioSection { get; set; }

    public ICollection<Project>? ManagedProjects { get; set; }
}
