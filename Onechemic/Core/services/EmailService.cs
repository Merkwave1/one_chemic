using Core.DTOs;
using Core.ServiceContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Core.services
{
    public class EmailService(ILogger<EmailService> _logger, IConfiguration _config) : IEmailService
    {


        public async Task<bool> SendAsync(ClientDto dto)
        {
            var sender = _config["Email:Address"]
                ?? throw new InvalidOperationException("Email:Address is not configured in appsettings.");
            var password = _config["Email:Password"]
                ?? throw new InvalidOperationException("Email:Password is not configured in appsettings.");

            string to = "info@onechmic.com";

            _logger.LogInformation("Attempting to send email from {Sender} to {To} with subject '{Subject}'", sender, to, dto.Subject);

            try
            {
                using var client = new SmtpClient("smtp.titan.email", 587)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(sender, password),
                    Timeout = 30000
                };

                var emailBody = $@"
                    Contact Form Submission
                    
                    Full Name: {dto.FullName}
                    Company: {dto.Company}
                    Email: {dto.Email}
                    Subject: {dto.Subject}
                    
                    Message:
                    {dto.Message}
                ";

                var mail = new MailMessage
                {
                    From = new MailAddress(sender),
                    Subject = $"Contact Form: {dto.Subject}",
                    Body = emailBody,
                    IsBodyHtml = false
                };

                mail.To.Add(to);
                await client.SendMailAsync(mail);
                _logger.LogInformation("Email sent successfully to {To}", to);
                return true;
            }
            catch (SmtpException ex)
            {
                _logger.LogError(ex, "SMTP error sending email to {To}. StatusCode: {StatusCode}", to, ex.StatusCode);
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error sending email to {To}", to);
                return false;
            }
        }
    }
}
