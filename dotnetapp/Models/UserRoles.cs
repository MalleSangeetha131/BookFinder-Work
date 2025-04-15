using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Models
{
    public class UserRoles
    {
        
        public  string BookRecommender{get;set;}
        public  string BookReader{get;set;}
    }
}