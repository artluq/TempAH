using System;
using System.Collections.Generic;

namespace API.Models;

public partial class BookingStatus
{
    public int StatusId { get; set; }

    public string Status { get; set; } = null!;
}
