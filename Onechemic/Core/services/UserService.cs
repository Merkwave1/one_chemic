using Core.DTOs;
using Core.Entities;
using Core.RepoContracts;
using Core.ServiceContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.services
{
    public class UserService(IUsersRepo _repo, IConfiguration _conf) : IUserService
    {


        // ==================== LOGIN ====================
        public async Task<AuthenticationResponse?> Login(LoginRequest req)
        {
            var user = await _repo.GetUserByEmailAndPassword(req.UserName, req.Password);
            if (user == null) return null;

            var token = GenerateJwtToken(user);

            return new AuthenticationResponse
            {
                UserId = user.Id,
                UserName = user.UserName,
                Token = token
            };
        }

        // ==================== REGISTER ====================
        public async Task<AuthenticationResponse?> Register(RegisterRequest req)
        {
            var user = new ApplicationUser
            {
                UserName = req.UserName,
            };

            var createdUser = await _repo.AddUser(user, req.Password);
            if (createdUser == null) return null;

            var token = GenerateJwtToken(createdUser);

            return new AuthenticationResponse
            {
                UserId = createdUser.Id,
                UserName = createdUser.UserName,
                Token = token
            };
        }

        // ==================== PRIVATE JWT GENERATOR ====================
        private string GenerateJwtToken(ApplicationUser user)
        {
            var jwtSection = _conf.GetSection("Jwt");

            var key = jwtSection["Key"];
            var issuer = jwtSection["Issuer"];
            var audience = jwtSection["Audience"];
            var expiresMinutes = int.Parse(jwtSection["ExpiresInMinutes"]!);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName!)
            };

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key!)
            );

            var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
