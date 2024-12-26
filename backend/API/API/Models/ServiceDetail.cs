using System;
using System.Collections.Generic;

namespace API.Models;

public partial class ServiceDetail
{
    public int ServiceDetailId { get; set; }

    public int? ServiceId { get; set; }

    public int? VendorId { get; set; }

    public string? ServiceTitle { get; set; }

    public string? Description { get; set; }

    public string? Details { get; set; }

    public decimal? PriceRange { get; set; }

    public bool? IsActive { get; set; }
}
