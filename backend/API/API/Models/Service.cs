using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;
}
