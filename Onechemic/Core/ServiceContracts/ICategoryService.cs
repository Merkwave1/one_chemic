using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ServiceContracts
{
    public interface ICategoryService
    {
        Task<Category> AddCategoryAsync(AddCategoryRequest category);
        Task<Category?> GetCategoryByIdAsync(int id);
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category?> UpdateCategoryAsync(int id, AddCategoryRequest category);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
