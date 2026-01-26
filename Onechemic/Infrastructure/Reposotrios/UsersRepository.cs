using Core.Entities;
using Core.RepoContracts;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Reposotrios
{
    public class UsersRepository : IUsersRepo
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersRepository(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<ApplicationUser?> AddUser(ApplicationUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                return user; 
            }

            // Log the errors for debugging
            foreach (var error in result.Errors)
            {
                Console.WriteLine($"Registration Error: {error.Code} - {error.Description}");
            }

            return null;
        }
        

        public async Task<ApplicationUser?> GetUserByEmailAndPassword(string? username, string? password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            // Find the user by username
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
                return null;

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, password);
            return isPasswordValid ? user : null;
        }
    }
}
    