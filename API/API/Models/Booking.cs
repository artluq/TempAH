using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int UserId { get; set; }

    public int WorkshopId { get; set; }

    public int? ServiceId { get; set; }

    public DateTime BookingDate { get; set; }

    public string? Status { get; set; }

    public string? Notes { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? StatusId { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
