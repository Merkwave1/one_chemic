using Core.DTOs;
using Core.Entities;
using Core.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        // Public: Get all products
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var products = await _service.GetAllProductsAsync();
            return Ok(products);
        }

        // Get product by id (authorized)
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _service.GetProductByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        // Add product (authorized)
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromForm] AddProductRequest req)
        {
            var product = await _service.AddProductAsync(req);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        // Update product (authorized)
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromForm] AddProductRequest req)
        {
            var updated = await _service.UpdateProductAsync(id, req);
            return updated == null ? NotFound() : Ok(updated);
        }

        // Delete product (authorized)
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteProductAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}
