using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.RepoContracts
{
    public interface IUsersRepo
    {
        Task<ApplicationUser?> AddUser(ApplicationUser user,string? password);
        Task<ApplicationUser?> GetUserByEmailAndPassword(string? username, string? password);
    }
}
