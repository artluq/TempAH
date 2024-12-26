using System;
using System.Collections.Generic;

namespace API.Models;

public partial class UvwBooking
{
    public DateTime BookingDate { get; set; }

    public string? Status { get; set; }

    public string? Notes { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int? StatusId { get; set; }

    public string? Expr1 { get; set; }

    public string? ServiceTitle { get; set; }

    public string? Description { get; set; }

    public string? Details { get; set; }

    public decimal? PriceRange { get; set; }

    public string? VendorName { get; set; }

    public int UserId { get; set; }

    public string? ServiceName { get; set; }

    public int VendorId { get; set; }

    public int BookingId { get; set; }

    public string? Slot { get; set; }
}
