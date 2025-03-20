using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using train_signal_ir_sever.Data;
using train_signal_ir_sever.Models;
using train_signal_ir_sever.SignalIr;

namespace train_signal_ir_sever.Controllers
{
    [Route("/product-management")]
    [ApiController]
    public class ProductManagementController (ApplicationDbContext _dbContext, IHubContext<ProductHub> _hubContext) : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _dbContext.Product.ToListAsync();
            return Ok(products);
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct(Product product)
        {
            _dbContext.Product.Add(product);
            await _dbContext.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveProductAdd", product);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            _dbContext.Product.Update(product);
            await _dbContext.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveProductUpdate", product);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _dbContext.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _dbContext.Product.Remove(product);
            await _dbContext.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveProductDelete", id);
            return Ok();
        }
    }
}
