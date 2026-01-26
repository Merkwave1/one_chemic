using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public record AuthenticationResponse(string UserId,string? UserName,string? Token)
    {
        public AuthenticationResponse() : this(default,default,default) { }
    }
}
