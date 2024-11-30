using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class DiagnosticRequest
    {
        [Required]
        public Dictionary<string, string> Responses { get; set; } = new Dictionary<string, string>();
    }

    public class DiagnosticResponse
    {
        [Required]
        public string Analysis { get; set; } = string.Empty;

        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }
}