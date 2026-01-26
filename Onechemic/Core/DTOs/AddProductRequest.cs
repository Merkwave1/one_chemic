using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class AddProductRequest
    {
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string DescriptionEn { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;
        public string DetailedDescriptionEn { get; set; } = string.Empty;
        public string DetailedDescriptionAr { get; set; } = string.Empty;
        public IFormFile? ImageFile { get; set; } 
        public string Nav { get; set; } = string.Empty;
        public string CategoryEn { get; set; } = string.Empty;
        public string CategoryAr { get; set; } = string.Empty;
    }
}
