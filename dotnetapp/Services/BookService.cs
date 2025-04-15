using System;
using System.Collections.Generic;
using System.Linq;
using dotnetapp.Data;
using dotnetapp.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Services
{
    public class BookService
    {
        public readonly ApplicationDbContext context;
        public BookService(ApplicationDbContext icontext)
        {
            context = icontext;
        }
        public async Task<IEnumerable<Book>> GetAllBooks(){
            var e = await context.Books.ToListAsync();
            return e;
        }
        public async Task<Book> GetBookById(int bookId){
           
             var e = await context.Books.FindAsync(bookId);            
             return e;
            
        }
        public async Task<bool> AddBook(Book book){
            var e= await context.Books.FindAsync(book.BookId);
            if(e!=null){
                return false;
            }
            context.Books.Add(book);
            await context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateBook(int bookId, Book book){
            var e= await context.Books.FindAsync(bookId);
            if(e==null){
                return false;
            }
            e.Title=book.Title;
            e.Author=book.Author;
            e.Genre=book.Genre;
            e.PublishedDate=book.PublishedDate;
            e.CoverImage=book.CoverImage;
            await context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteBook(int bookId){
            var e= await context.Books.FindAsync(bookId);
            if(e==null){
                return false;
            }
            context.Books.Remove(e);
            await context.SaveChangesAsync();
            return true; 


        }

    }
}
