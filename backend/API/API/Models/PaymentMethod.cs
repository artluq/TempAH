using System;
using System.Collections.Generic;

namespace API.Models;

public partial class PaymentMethod
{
    public int MethodId { get; set; }

    public string? Method { get; set; }
}
