using API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TempahDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // Validate the issuer (the person or service that generated the token)
            ValidateIssuer = true,
            // Validate the audience (the recipient of the token)
            ValidateAudience = true,
            // Validate that the token is not expired
            ValidateLifetime = true,
            // Validate the signing key used to sign the token
            ValidateIssuerSigningKey = true,
            // Provide the key used to validate the JWT signature
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
            // Specify the expected issuer (who issued the token)
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            // Specify the expected audience (who the token is intended for)
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")  // Your Angular app's URL
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();


// Enable CORS middleware
app.UseCors("AllowAngularApp");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
