using DataAccess.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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
    }
}
