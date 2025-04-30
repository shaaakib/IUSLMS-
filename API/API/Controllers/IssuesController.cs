using DataAccess.Data;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public IssuesController(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET: api/Issue

        [HttpGet("GetAllIssues")]
        public async Task<ActionResult<IEnumerable<Issue>>> GetAllIssues()
        {
            return await _db.Issues
                .Include(i => i.User)
                .Include(i => i.Book)
                .ToListAsync();
        }

        // GET: api/Issue/5
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

        // POST: api/Issue/Create
        [HttpPost("Create")]
        public async Task<ActionResult<Issue>> Create(Issue issue)
        {
            issue.IssueDate = DateTime.Now;

            _db.Issues.Add(issue);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIssueById), new { id = issue.Id }, issue);
        }

        // PUT: api/Issue/Update/5
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

        // DELETE: api/Issue/Delete/5
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
