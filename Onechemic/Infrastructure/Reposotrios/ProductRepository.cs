using Core.Entities;
using Infrastructure.persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Reposotrios
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product?> UpdateProductAsync(Product product)
        {
            var existing = await _context.Products.FindAsync(product.Id);
            if (existing == null) return null;

            // Update properties
            existing.TitleEn = product.TitleEn;
            existing.TitleAr = product.TitleAr;
            existing.DescriptionEn = product.DescriptionEn;
            existing.DescriptionAr = product.DescriptionAr;
            existing.DetailedDescriptionEn = product.DetailedDescriptionEn;
            existing.DetailedDescriptionAr = product.DetailedDescriptionAr;
            existing.ImagePath = product.ImagePath;
            existing.Nav = product.Nav;
            existing.CategoryEn = product.CategoryEn;
            existing.CategoryAr = product.CategoryAr;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
