using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;

[Route("api/[controller]")]
[ApiController]
[EnableCors("AllowAll")]

public class AIDiagnosticController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<AIDiagnosticController> _logger;
    private const string FLASK_SERVICE_URL = "http://localhost:5000/diagnose";

    public AIDiagnosticController(
        ILogger<AIDiagnosticController> logger)
    {
        _logger = logger;
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    }

    [HttpPost("diagnose")]
    public async Task<IActionResult> GetDiagnostic([FromBody] DiagnosticRequest request)
    {
        try
        {
            _logger.LogInformation("Starting diagnostic request");

            _logger.LogInformation($"Attempting to connect to Flask service at: {FLASK_SERVICE_URL}");

            var flaskRequest = new
            {
                problemDescription = string.Join("\n", request.Responses.Select(r => $"{r.Key}: {r.Value}"))
            };

            _logger.LogInformation($"Request payload: {JsonSerializer.Serialize(flaskRequest)}");

            var jsonContent = new StringContent(
                JsonSerializer.Serialize(flaskRequest),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(FLASK_SERVICE_URL, jsonContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            _logger.LogInformation($"Response Status: {response.StatusCode}");
            _logger.LogInformation($"Response Content: {responseContent}");

            if (response.IsSuccessStatusCode)
            {
                var flaskResponse = JsonDocument.Parse(responseContent);
                var analysis = flaskResponse.RootElement
                    .GetProperty("analysis")
                    .GetString();

                return Ok(new DiagnosticResponse
                {
                    Success = true,
                    Analysis = analysis ?? "No analysis provided"
                });
            }
            else
            {
                _logger.LogError($"Flask service error: {responseContent}");
                return StatusCode((int)response.StatusCode, new DiagnosticResponse
                {
                    Success = false,
                    ErrorMessage = $"AI service error: {responseContent}"
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error in diagnostic: {ex}");
            return StatusCode(500, new DiagnosticResponse
            {
                Success = false,
                ErrorMessage = $"An unexpected error occurred: {ex.Message}"
            });
        }
    }
}
