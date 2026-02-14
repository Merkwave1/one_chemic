using Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ServiceContracts
{
    public interface IEmailService
    {
        Task<bool> SendAsync(ClientDto dto);

    }
}
