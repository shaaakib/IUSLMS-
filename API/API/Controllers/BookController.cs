using DataAccess.Data;
using Entities;
using Entities.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [EnableCors("AllowCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BookController(ApplicationDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
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

            // Generate full image URL
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var fullImageUrl = string.IsNullOrEmpty(book.ImageUrl)
                ? null
                : $"{baseUrl}/{book.ImageUrl}";

            return Ok(new
            {
                book.Id,
                book.Title,
                book.Description,
                book.Author,
                book.Quantity,
                ImageUrl = fullImageUrl
            });
        }


        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] BookCreateDto bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Book data is missing.");
            }

            // Check for existing book data
            var existingBook = await _db.Books
                .FirstOrDefaultAsync(b => b.Title == bookDto.Title && b.Author == bookDto.Author);

            if (existingBook != null)
            {
                return Conflict("Book already exists.");
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            string fileName = null;
            string bookPath = Path.Combine(wwwRootPath, "images", "book");

            // Ensure folder exists
            if (!Directory.Exists(bookPath))
            {
                Directory.CreateDirectory(bookPath);
            }

            if (bookDto.Image != null)
            {
                fileName = Guid.NewGuid().ToString() + Path.GetExtension(bookDto.Image.FileName);
                string fullPath = Path.Combine(bookPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await bookDto.Image.CopyToAsync(stream);
                }
            }

            var book = new Book
            {
                Title = bookDto.Title,
                Description = bookDto.Description,
                Author = bookDto.Author,
                Quantity = bookDto.Quantity,
                ImageUrl = fileName != null ? Path.Combine(@"\images\book\", fileName).Replace("\\", "/") : null
            };

            _db.Books.Add(book);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(Create), new { id = book.Id }, book);
        }



        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] BookUpdateDto bookDto)
        {
            if (bookDto == null || bookDto.Id != id)
            {
                return BadRequest("Book is null or ID mismatch");
            }

            var existingBook = await _db.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound("Book not found");
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            string fileName = existingBook.ImageUrl; // Keep existing image if no new image is provided
            string bookPath = Path.Combine(wwwRootPath, "images", "book");

            if (!Directory.Exists(bookPath))
            {
                Directory.CreateDirectory(bookPath);
            }

            // If new image is provided
            if (bookDto.Image != null)
            {
                // Delete old image if exists
                if (!string.IsNullOrEmpty(existingBook.ImageUrl))
                {
                    var oldImagePath = Path.Combine(wwwRootPath, existingBook.ImageUrl.TrimStart('\\', '/'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                fileName = Guid.NewGuid().ToString() + Path.GetExtension(bookDto.Image.FileName);
                string fullPath = Path.Combine(bookPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await bookDto.Image.CopyToAsync(stream);
                }

                existingBook.ImageUrl = Path.Combine("images/book", fileName).Replace("\\", "/");
            }

            // Update other fields
            existingBook.Title = bookDto.Title;
            existingBook.Description = bookDto.Description;
            existingBook.Author = bookDto.Author;
            existingBook.Quantity = bookDto.Quantity;

            await _db.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                data = existingBook,
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
