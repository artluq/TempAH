using System;
using System.Collections.Generic;

namespace API.Models;

public partial class State
{
    public int StateId { get; set; }

    public string StateName { get; set; } = null!;
}
