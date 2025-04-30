using DataAccess.Data;
using Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("AllowCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllBooks")]
        public IActionResult GetAllBooks()
        {
            var books = _db.Books.ToList();
            return Ok(books);
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody] Book book)
        {
            if (book == null)
            {
                return BadRequest("Book is null");
            }
            _db.Books.Add(book);
            _db.SaveChanges();
            return CreatedAtAction(nameof(GetAllBooks), new { id = book.Id }, book);
        }
    }
}
