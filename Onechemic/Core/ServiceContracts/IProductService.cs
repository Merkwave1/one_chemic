using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ServiceContracts
{
    public interface IProductService
    {
        Task<Product> AddProductAsync(AddProductRequest product);
        Task<Product?> GetProductByIdAsync(int id);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> UpdateProductAsync(int id, AddProductRequest product);
        Task<bool> DeleteProductAsync(int id);
    }
}
