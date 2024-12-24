using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class DiagnosticRequest
    {
        public Dictionary<string, string> Responses { get; set; } = new();
    }

    public class DiagnosticResponse
    {
        public bool Success { get; set; }
        public string? Analysis { get; set; }
        public string? ErrorMessage { get; set; }
    }
}