using System;
using System.Collections.Generic;

namespace API.Models;

public partial class UserRole
{
    public int RoleId { get; set; }

    public string Role { get; set; } = null!;
}
