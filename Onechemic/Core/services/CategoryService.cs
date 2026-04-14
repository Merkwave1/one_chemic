using Core.DTOs;
using Core.Entities;
using Core.ServiceContracts;
using Infrastructure.Reposotrios;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Core.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;
        private readonly string _imageFolder;

        public CategoryService(ICategoryRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
            _imageFolder = Path.Combine(env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot"), "categories");
            if (!Directory.Exists(_imageFolder))
                Directory.CreateDirectory(_imageFolder);
        }

        private async Task<string> SaveImageAsync(IFormFile? file)
        {
            if (file == null || file.Length == 0) return string.Empty;

            var uniqueName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(_imageFolder, uniqueName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return "/categories/" + uniqueName;
        }

        private void DeleteImage(string? imagePath)
        {
            if (string.IsNullOrEmpty(imagePath)) return;

            var fileName = imagePath.Replace("/categories/", "");
            var filePath = Path.Combine(_imageFolder, fileName);

            if (File.Exists(filePath))
                File.Delete(filePath);
        }

        public async Task<Category> AddCategoryAsync(AddCategoryRequest req)
        {
            var category = new Category
            {
                TitleEn = req.TitleEn,
                TitleAr = req.TitleAr
            };

            if (req.ImageFile != null)
            {
                category.ImagePath = await SaveImageAsync(req.ImageFile);
            }

            return await _repo.AddCategoryAsync(category);
        }

        public async Task<Category?> UpdateCategoryAsync(int id, AddCategoryRequest req)
        {
            var existing = await _repo.GetCategoryByIdAsync(id);
            if (existing == null) return null;

            if (req.ImageFile != null)
            {
                DeleteImage(existing.ImagePath);
                existing.ImagePath = await SaveImageAsync(req.ImageFile);
            }

            existing.TitleEn = req.TitleEn;
            existing.TitleAr = req.TitleAr;

            return await _repo.UpdateCategoryAsync(existing);
        }

        public async Task<Category?> GetCategoryByIdAsync(int id) => await _repo.GetCategoryByIdAsync(id);

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync() => await _repo.GetAllCategoriesAsync();

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _repo.GetCategoryByIdAsync(id);
            if (category == null) return false;

            DeleteImage(category.ImagePath);
            return await _repo.DeleteCategoryAsync(id);
        }
    }
}
