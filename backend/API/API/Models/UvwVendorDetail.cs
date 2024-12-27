using System;
using System.Collections.Generic;

namespace API.Models;

public partial class UvwVendorDetail
{
    public int VendorId { get; set; }

    public string? VendorName { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int? StateId { get; set; }

    public int? UserId { get; set; }

    public string? ImagePath { get; set; }

    public decimal? Rating { get; set; }

    public int? ServiceDetailId { get; set; }

    public string? ServiceTitle { get; set; }

    public string? Description { get; set; }

    public string? Details { get; set; }

    public decimal? PriceRange { get; set; }

    public bool? ServicesDetailsIsActive { get; set; }

    public int? ServiceId { get; set; }

    public string? ServiceName { get; set; }
}
