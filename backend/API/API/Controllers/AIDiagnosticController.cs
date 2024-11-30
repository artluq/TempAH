using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System;
using API.Models;

//This is the controller for the AI Diagnostic API
//It is used to diagnose the car issue based on the user's responses
//Hopefully it works !!!!

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIDiagnosticController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AIDiagnosticController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("diagnose")]
        public async Task<IActionResult> GetDiagnostic([FromBody] DiagnosticRequest request)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                // Forward the request to the Python Flask service
                var response = await client.PostAsJsonAsync("http://localhost:5000/diagnose", request);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, new { error = errorContent });
                }

                var result = await response.Content.ReadFromJsonAsync<DiagnosticResponse>();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
