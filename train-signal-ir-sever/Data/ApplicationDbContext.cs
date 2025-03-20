using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using train_signal_ir_sever.Models;

namespace train_signal_ir_sever.Data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Product { get; set; } = null!;
    }
}