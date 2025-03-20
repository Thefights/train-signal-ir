using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using train_signal_ir_sever.Data;
using train_signal_ir_sever.SignalIr;

namespace train_signal_ir_sever
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddSignalR();


            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost3000", policy =>
                    policy.WithOrigins("http://localhost:3000")  // Allow only this origin
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());  // Enable cookies if needed
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Train Signal API",
                    Version = "v1",
                    Description = "API for Train Signal IR Server",
                    Contact = new OpenApiContact
                    {
                        Name = "quachkhang",
                        Email = "phuckhang1088@gmail.com",
                    }
                });
            });



            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowLocalhost3000");
            app.MapHub<ChatHub>("/Chat");


            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Train Signal API v1");
                c.RoutePrefix = "swagger"; // Swagger UI available at: https://localhost:5001/swagger
            });

            app.MapStaticAssets();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}")
                .WithStaticAssets();

            app.Run();
        }
    }
}
