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

        [HttpGet("GetBookById/{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
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

        [HttpPut("Update/{id}")]
        public IActionResult Update(int id, [FromBody] Book book)
        {
            if (book == null || book.Id != id)
            {
                return BadRequest("Book is null or ID mismatch");
            }

            var existingBook = _db.Books.Find(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = book.Title;
            existingBook.Description = book.Description;
            existingBook.Author = book.Author;
            existingBook.Quantity = book.Quantity;

            _db.SaveChanges();
            return Ok(new
            {
                success = true,
                data = book,
                message = "Book updated successfully"
            });

        }


        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var book = _db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }
            _db.Books.Remove(book);
            _db.SaveChanges();
            return NoContent();
        }
    }
}
