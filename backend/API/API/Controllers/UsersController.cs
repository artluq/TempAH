using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TempahDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(TempahDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/Users/Register
        [HttpPost("Register")]
        public async Task<ActionResult<User>> RegisterUser(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'TempahDbContext.Users' is null.");
            }

            user.CreatedAt = DateTime.Now;

            // Hash the password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            // Add the user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate JWT token
            var token = GenerateJwtToken(user);

            return CreatedAtAction("GetUser", new { id = user.UserId }, new { user, token });
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginModel)
        {
            if (_context.Users == null)
            {
                return BadRequest("No users available.");
            }

            var user = await _context.Users
                                      .FirstOrDefaultAsync(u => u.Username == loginModel.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Generate the JWT token
            var token = GenerateJwtToken(user);

            // Return the token and role information
            return Ok(new { token, role = user.RoleId, fullname = user.FullName, userid = user.UserId });
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UvwUserRole>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound(new { message = "No users found." });
            }

            // Retrieve all users
            var users = await _context.UvwUserRoles.ToListAsync();

            return Ok(users); // Return the list of users
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UvwUserRole>> GetUser(int id)
        {
            if (_context.UvwUserRoles == null)
            {
                return NotFound("Users not found.");
            }

            var user = await _context.UvwUserRoles.FirstOrDefaultAsync(x => x.UserId == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user); // Return the user data if found
        }


        // Method to generate JWT token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleId.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.UserId)
            {
                return BadRequest(new { message = "User ID mismatch." });
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Update fields
            existingUser.FullName = updatedUser.FullName;
            existingUser.Username = updatedUser.Username;
            existingUser.Email = updatedUser.Email;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.RoleId = updatedUser.RoleId;

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new { message = "User not found." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingUser); // Return the updated user
        }

        // PUT: api/Users/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(int id, [FromBody] UpdateUserStatusDto updateUserStatusDto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Update the 'Active' status
            user.IsActive = updateUserStatusDto.Active;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
                return Ok(new { message = "User status updated successfully" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new { message = "User not found" });
                }
                else
                {
                    throw;
                }
            }
        }

        //[HttpPost("ForgotPassword")]
        //public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        //{
        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        //    if (user == null)
        //    {
        //        return BadRequest("No user found with that email address.");
        //    }

        //    // Generate a password reset token (e.g., GUID or JWT)
        //    var resetToken = Guid.NewGuid().ToString();
        //    user.PasswordResetToken = resetToken;
        //    user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1); // Token expires in 1 hour

        //    await _context.SaveChangesAsync();

        //    // Send an email with the password reset link
        //    var resetLink = $"{_configuration["AppUrl"]}/reset-password?token={resetToken}";
        //    SendPasswordResetEmail(user.Email, resetLink);

        //    return Ok("Password reset link has been sent to your email.");
        //}

        private void SendPasswordResetEmail(string email, string resetLink)
        {
            var fromEmail = _configuration["Email:FromEmail"];
            var smtpServer = _configuration["Email:SmtpServer"];
            var smtpPort = int.Parse(_configuration["Email:SmtpPort"]);
            var smtpUser = _configuration["Email:SmtpUser"];
            var smtpPassword = _configuration["Email:SmtpPassword"];

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = "Password Reset Request",
                Body = $"Click the following link to reset your password: <a href='{resetLink}'>Reset Password</a>",
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            using (var smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.Credentials = new NetworkCredential(smtpUser, smtpPassword);
                smtpClient.Send(mailMessage);
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        // Check if the user exists
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        // Helper model to handle the login request
        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class UpdateUserStatusDto
        {
            public bool Active { get; set; }
        }

        public class ForgotPasswordRequest
        {
            public string Email { get; set; }
        }
    }

}

