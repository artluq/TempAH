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
    private const string FLASK_SERVICE_URL = "http://127.0.0.1:5000/diagnose";

    public AIDiagnosticController(
        ILogger<AIDiagnosticController> logger)
    {
        _logger = logger;
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    }

    [HttpOptions("diagnose")]
    public IActionResult PreflightRoute()
    {
        return Ok();
    }

    [HttpPost("diagnose")]
    public async Task<IActionResult> PostDiagnostic([FromBody] DiagnosticRequest request)
    {
        try
        {
            _logger.LogInformation($"Received request with {request.Responses?.Count} responses");

            var jsonContent = new StringContent(
                JsonSerializer.Serialize(new { Responses = request.Responses }),
                Encoding.UTF8,
                "application/json"
            );

            _logger.LogInformation($"Sending to Flask: {await jsonContent.ReadAsStringAsync()}");

            using var response = await _httpClient.PostAsync(FLASK_SERVICE_URL, jsonContent);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            _logger.LogInformation($"Flask response status: {response.StatusCode}");
            _logger.LogInformation($"Flask response content: {responseContent}");

            if (string.IsNullOrEmpty(responseContent))
            {
                _logger.LogError("Empty response from Flask service");
                return StatusCode(502, new DiagnosticResponse
                {
                    Success = false,
                    ErrorMessage = "Empty response from AI service"
                });
            }

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"Flask service error: {response.StatusCode} - {responseContent}");
                return StatusCode((int)response.StatusCode, new DiagnosticResponse
                {
                    Success = false,
                    ErrorMessage = $"Flask service error: {responseContent}"
                });
            }

            try
            {
                var flaskResponse = JsonSerializer.Deserialize<DiagnosticResponse>(responseContent);
                if (flaskResponse == null)
                {
                    _logger.LogError("Failed to deserialize Flask response");
                    return StatusCode(502, new DiagnosticResponse
                    {
                        Success = false,
                        ErrorMessage = "Invalid response from AI service"
                    });
                }
                return Ok(flaskResponse);
            }
            catch (JsonException ex)
            {
                _logger.LogError($"JSON parsing error: {ex.Message}");
                return StatusCode(502, new DiagnosticResponse
                {
                    Success = false,
                    ErrorMessage = "Failed to parse AI service response"
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error: {ex.Message}");
            return StatusCode(500, new DiagnosticResponse
            {
                Success = false,
                ErrorMessage = $"An error occurred: {ex.Message}"
            });
        }
    }
}
