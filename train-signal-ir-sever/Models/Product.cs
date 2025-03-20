﻿using System.ComponentModel.DataAnnotations;

namespace train_signal_ir_sever.Models
{
    public class Product
    {
        [Key]
       public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
    }
}
