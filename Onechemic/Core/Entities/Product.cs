using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;

        public string DescriptionEn { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;

        public string DetailedDescriptionEn { get; set; } = string.Empty;
        public string DetailedDescriptionAr { get; set; } = string.Empty;

        public string ImagePath { get; set; } = string.Empty;
        public string Nav { get; set; } = string.Empty;

        public string CategoryEn { get; set; } = string.Empty;
        public string CategoryAr { get; set; } = string.Empty;
    }
}
