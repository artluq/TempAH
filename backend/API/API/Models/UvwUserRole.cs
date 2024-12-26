using System;
using System.Collections.Generic;

namespace API.Models;

public partial class UvwUserRole
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string? PasswordHash { get; set; }

    public string? Email { get; set; }

    public string? FullName { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? IsActive { get; set; }

    public int? RoleId { get; set; }

    public string Role { get; set; } = null!;
}
