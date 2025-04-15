using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    //[ApiController]
    //[Route("api/[controller]")]
    public class ErrorController : Controller
    {
    [HttpGet("Error/{statusCode}")]
        public IActionResult HttpStatusCodeHandler(int statusCode)
        {
            ViewBag.StatusCode = statusCode;
            switch(statusCode)
            {
                case 404:
                ViewBag.ErrorMessage = "Sorry, the page you are looking for could not be found.";
                break;
                case 500:
                ViewBag.ErrorMessage = "Sorry, something went wrong on the server.";
                break;
                default:
                ViewBag.ErrorMessage = "An unexpected error occurred.";
                break;
            }
            return View("Error");
        }
    }
}