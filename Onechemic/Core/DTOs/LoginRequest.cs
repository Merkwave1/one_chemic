using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username is required")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        public LoginRequest() { }

        public LoginRequest(string? userName, string? password)
        {
            UserName = userName;
            Password = password;
        }
    }
}
