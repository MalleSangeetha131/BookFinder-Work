using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using System.Threading.Tasks.Sources;
using System;

namespace dotnetapp.Services;
public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _context = context;
    }

    public async Task<(int, string)> Registration(User model, string role)
    {
       
        var userExists = await _userManager.FindByEmailAsync(model.Email);
        if (userExists != null)
        { 
            return (0, "User already exists");
        }

        
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            Name = model.Username,
            SecurityStamp = Guid.NewGuid().ToString()
        };
        
        var result = await _userManager.CreateAsync(user, model.Password);
        
        if (!result.Succeeded)
            return (0, "User creation failed! Please check user details and try again.");

        
        if (!await _roleManager.RoleExistsAsync(role))
            await _roleManager.CreateAsync(new IdentityRole(role));

        await _userManager.AddToRoleAsync(user, role);
        return (1, "User created successfully!");
    }

    public async Task<(int, object)> Login(LoginModel model)
    {
        
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return (0, "Invalid email");

        
        if (!await _userManager.CheckPasswordAsync(user, model.Password))
            return (0, "Invalid password");

        
        // Retrieve user's role
        var roles = await _userManager.GetRolesAsync(user);
        var userRole = roles.FirstOrDefault();   

       
        var token = GenerateToken(new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),            
            new Claim(ClaimTypes.Role, userRole)
        });
        return (1, new{
            Token =token,
            Role=userRole
        });
    }

    private string GenerateToken(IEnumerable<Claim> claims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer:
            _configuration["Jwt:ValidIssuer"],
            audience:
            _configuration["Jwt:ValidAudience"],
            claims:claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
