using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int? EstimatedDuration { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }
}
