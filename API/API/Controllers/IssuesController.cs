using DataAccess.Data;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [EnableCors("AllowCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public IssuesController(ApplicationDbContext db)
        {
            _db = db;
        }

        //[HttpGet("GetAllIssues")]
        //public async Task<ActionResult<IEnumerable<Issue>>> GetAllIssues()
        //{
        //    var res = await _db.Issues
        //        .Include(i => i.User)
        //        .Include(i => i.Book)
        //        .ToListAsync();

        //    return Ok(res);
        //}

        [Authorize]
        [HttpGet("GetAllIssues")]
        public async Task<IActionResult> GetAllIssues()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || string.IsNullOrEmpty(roleClaim))
            {
                return Unauthorized("Invalid token claims.");
            }

            var userId = int.Parse(userIdClaim);

            if (roleClaim == "Admin")
            {
                // ✅ Admin sees all issues
                var allIssues = await _db.Issues
                    .Include(i => i.Book)
                    .Include(i => i.User)
                    .ToListAsync();

                return Ok(allIssues);
            }
            else
            {
                // Normal user sees only their issues
                var userIssues = await _db.Issues
                    .Where(i => i.UserId == userId)
                    .Include(i => i.Book)
                    .Include(i => i.User)
                    .ToListAsync();

                return Ok(userIssues);
            }
        }


        [HttpGet("GetIssueById/{id}")]
        public async Task<ActionResult<Issue>> GetIssueById(int id)
        {
            var issue = await _db.Issues
                .Include(i => i.User)
                .Include(i => i.Book)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (issue == null)
                return NotFound();

            return issue;
        }


        [HttpPost("Create")]
        public async Task<ActionResult<Issue>> Create(Issue issue)
        {
            var userExists = await _db.Users.AnyAsync(u => u.Id == issue.UserId);
            if (!userExists)
            {
                return BadRequest($"User with ID {issue.UserId} does not exist.");
            }

            issue.IssueDate = DateTime.Now;
            issue.Status = "Pending";
            _db.Issues.Add(issue);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIssueById), new { id = issue.Id }, issue);
        }

        [HttpPut("Approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
            var issue = await _db.Issues.Include(i => i.Book).FirstOrDefaultAsync(i => i.Id == id);
            if (issue == null)
                return NotFound();

            if (issue.Book.Quantity <= 0)
                return BadRequest(new { message = "Book not available" }); // Return JSON

            issue.Status = "Approved";
            issue.Book.Quantity -= (int)issue.Quantity;

            await _db.SaveChangesAsync();

            // Return the updated issue object
            return Ok(issue); // Return the updated Issue object
        }

        [HttpPut("Reject/{id}")]
        public async Task<IActionResult> Reject(int id)
        {
            var issue = await _db.Issues.FindAsync(id);
            if (issue == null)
                return NotFound();

            issue.Status = "Rejected";
            await _db.SaveChangesAsync();

            // Return the updated issue object
            return Ok(issue); // Return the updated Issue object
        }


        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(int id, Issue issue)
        {
            if (id != issue.Id)
                return BadRequest();

            _db.Entry(issue).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.Issues.Any(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var issue = await _db.Issues.FindAsync(id);
            if (issue == null)
                return NotFound();

            _db.Issues.Remove(issue);
            await _db.SaveChangesAsync();

            return NoContent();
        }

    }
}
