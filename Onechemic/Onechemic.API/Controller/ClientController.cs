using Core.DTOs;
using Core.Entities;
using Core.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IEmailService _service;
        public ClientController(IEmailService service)
        {
            _service = service;
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ClientDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _service.SendAsync(dto);

                if (result)
                {
                    return Ok(new { success = true, message = "Email sent successfully" });
                }
                else
                {
                    return StatusCode(500, new { success = false, message = "Failed to send email" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "An error occurred while sending email" });
            }
        }

    }
}
