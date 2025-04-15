using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("/api/books/")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            var books = await _bookService.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("{bookId}")]
        public async Task<ActionResult<Book>> GetBookById(int bookId)
        {
            var book = await _bookService.GetBookById(bookId);
            if (book == null)
            {
                return NotFound("Book not found");
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult> AddBook([FromBody] Book book)
        {
            try
            {
                bool result = await _bookService.AddBook(book);
                if (result)
                {
                    return Ok("Book added successfully");
                }
                return StatusCode(500, "Failed to add book");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{bookId}")]
        public async Task<ActionResult> UpdateBook(int bookId, [FromBody] Book book)
        {
            try
            {
                var updated = await _bookService.UpdateBook(bookId, book);
                if (updated)
                {
                    return Ok("Book updated successfully");
                }
                return NotFound("Cannot find any book");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{bookId}")]
        public async Task<ActionResult> DeleteBook(int bookId)
        {
            try
            {
                var deleted = await _bookService.DeleteBook(bookId);
                if (deleted)
                {
                    return Ok("Book deleted successfully");
                }
                return NotFound("Cannot find any book");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}