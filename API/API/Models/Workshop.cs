using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Workshop
{
    public int WorkshopId { get; set; }

    public string WorkshopName { get; set; } = null!;

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }
}
