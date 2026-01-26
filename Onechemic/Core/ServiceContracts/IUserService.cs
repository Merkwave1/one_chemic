using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ServiceContracts
{
    public interface IUserService
    {
        Task<AuthenticationResponse?> Register(RegisterRequest req);
        Task<AuthenticationResponse?> Login(LoginRequest req);
    }
}
