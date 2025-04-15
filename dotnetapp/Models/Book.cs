using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Models
{
    public class Book
    {
        [Key]
        public int BookId{get;set;}
        public string Title{get;set;}
        public string Author{get;set;}
        public string Genre{get;set;}
        public string PublishedDate{get;set;}
        public string CoverImage{get;set;}
        
    }
}