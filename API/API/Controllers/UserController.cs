using DataAccess.Data;
using Entities;
using Entities.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [EnableCors("AllowCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _config;
        public UserController(ApplicationDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _db.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        //[HttpPost("SignUp")]
        //public async Task<IActionResult> CreateUser([FromBody] User user)
        //{
        //    // Check if a user with the same email already exists
        //    var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        //    if (existingUser != null)
        //    {
        //        return Conflict(new { message = "User with this email already exists." });
        //    }

        //    _db.Users.Add(user);
        //    await _db.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        //}

        [HttpPost("SignUp")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return Conflict(new { message = "User with this email already exists." });
            }

            // Generate OTP
            var otp = new Random().Next(100000, 999999).ToString();

            // Send OTP (Mocked)
            var twilioService = new MOCKSMSsending();
            var isOtpSent = twilioService.SendOtp(user.PhoneNumber, otp);

            if (!isOtpSent)
            {
                return BadRequest(new { message = "Failed to send OTP." });
            }

            // Save user with OTP
            user.Otp = otp;
            user.IsPhoneVerified = false;
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { message = "OTP sent (mock). Please verify." });
        }

        [HttpPost("VerifyOtp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto verifyOtpDto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.PhoneNumber == verifyOtpDto.PhoneNumber);

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (user.Otp != verifyOtpDto.Otp)
            {
                return BadRequest(new { message = "Invalid OTP." });
            }

            user.IsPhoneVerified = true;
            user.Otp = null; // Clear OTP
            await _db.SaveChangesAsync();

            return Ok(new { message = "Phone number verified successfully!" });
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token = token,
                role = user.Role,
                user = new { user.Id, user.Name, user.Email }
            });
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.Id)
                return BadRequest("User ID mismatch");

            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Role = updatedUser.Role;

            await _db.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
            return Ok(new { message = "User deleted successfully" });
        }


        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
