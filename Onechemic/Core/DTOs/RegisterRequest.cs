using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username is required")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        public RegisterRequest() { }

        public RegisterRequest(string? userName, string? password)
        {
            UserName = userName;
            Password = password;
        }
    }
}
