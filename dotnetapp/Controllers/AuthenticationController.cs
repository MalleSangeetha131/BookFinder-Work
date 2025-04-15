using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        
        [HttpPost("api/login")]
        public async Task<IActionResult> Login(LoginModel model){
           
            try
            {
 
                if(!ModelState.IsValid)
                    return BadRequest(new {Status = "Error", Message = "Invalid Payload"});
               
                var (status, message) = await _authService.Login(model);
                if(status==0){
                    return BadRequest(new {Status = "Error", Message = message});
                }
                return Ok(new {user = message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
 
        [HttpPost("api/register")]
        public async Task<IActionResult> Register(User model){
            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(new {Status = "Error", Message = "Invalid Payload"});
                    Console.WriteLine("model",model);
                if(model.UserRole == "BookReader" || model.UserRole == "BookRecommender")
                {
 
                    var (status, message) = await _authService.Registration(model, model.UserRole);
                    if(status==0){
                        return BadRequest(new {Status = "Error", Message = message});
                    }
                    return Ok(new {Status = "Success", Message = message });
                }
                else
                {
                    return BadRequest(new {Status = "Error", Message = "Invalid user role"});
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
