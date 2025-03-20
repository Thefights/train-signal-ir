using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using train_signal_ir_sever.Data;
using train_signal_ir_sever.Models;

namespace train_signal_ir_sever.Controllers
{
    [Route("/product-management")]
    [ApiController]
    public class ProductManagementController (ApplicationDbContext _dbContext) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(_dbContext.Product);
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct(Product product)
        {
            _dbContext.Product.Add(product);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            _dbContext.Product.Update(product);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _dbContext.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _dbContext.Product.Remove(product);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
