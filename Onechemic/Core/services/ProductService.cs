using Core.DTOs;
using Core.Entities;
using Core.RepoContracts;
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
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        private readonly string _imageFolder;


        public ProductService(IProductRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;

            // Use IWebHostEnvironment to get the correct wwwroot path
            _imageFolder = Path.Combine(env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot"), "products");
            if (!Directory.Exists(_imageFolder))
                Directory.CreateDirectory(_imageFolder);
        }

        // Save image
        private async Task<string> SaveImageAsync(IFormFile? file)
        {
            if (file == null || file.Length == 0) return string.Empty;

            var uniqueName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(_imageFolder, uniqueName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            // Save relative path to DB
            return "/products/" + uniqueName;
        }

        // Delete image
        private void DeleteImage(string? imagePath)
        {
            if (string.IsNullOrEmpty(imagePath)) return;

            var fileName = imagePath.Replace("/products/", "");
            var filePath = Path.Combine(_imageFolder, fileName);

            if (File.Exists(filePath))
                File.Delete(filePath);
        }

        // Add Product
        public async Task<Product> AddProductAsync(AddProductRequest req)
        {
            var product = new Product
            {
                TitleEn = req.TitleEn,
                TitleAr = req.TitleAr,
                DescriptionEn = req.DescriptionEn,
                DescriptionAr = req.DescriptionAr,
                DetailedDescriptionEn = req.DetailedDescriptionEn,
                DetailedDescriptionAr = req.DetailedDescriptionAr,
                Nav = req.Nav,
                CategoryEn = req.CategoryEn,
                CategoryAr = req.CategoryAr
            };

            if (req.ImageFile != null)
            {
                product.ImagePath = await SaveImageAsync(req.ImageFile);
            }

            return await _repo.AddProductAsync(product);
        }

        // Update Product
        public async Task<Product?> UpdateProductAsync(int id, AddProductRequest req)
        {
            var existing = await _repo.GetProductByIdAsync(id);
            if (existing == null) return null;

            // Replace image if new one uploaded
            if (req.ImageFile != null)
            {
                DeleteImage(existing.ImagePath);
                existing.ImagePath = await SaveImageAsync(req.ImageFile);
            }

            existing.TitleEn = req.TitleEn;
            existing.TitleAr = req.TitleAr;
            existing.DescriptionEn = req.DescriptionEn;
            existing.DescriptionAr = req.DescriptionAr;
            existing.DetailedDescriptionEn = req.DetailedDescriptionEn;
            existing.DetailedDescriptionAr = req.DetailedDescriptionAr;
            existing.Nav = req.Nav;
            existing.CategoryEn = req.CategoryEn;
            existing.CategoryAr = req.CategoryAr;

            return await _repo.UpdateProductAsync(existing);
        }

        public async Task<Product?> GetProductByIdAsync(int id) => await _repo.GetProductByIdAsync(id);

        public async Task<IEnumerable<Product>> GetAllProductsAsync() => await _repo.GetAllProductsAsync();

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _repo.GetProductByIdAsync(id);
            if (product == null) return false;

            DeleteImage(product.ImagePath);
            return await _repo.DeleteProductAsync(id);
        }
    }
}
