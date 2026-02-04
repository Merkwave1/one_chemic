using Core;
using Core.Entities;
using Infrastructure;
using Infrastructure.DataSeeding;
using Infrastructure.persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Onechemic.API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfratServices(builder.Configuration);
builder.Services.AddCoreServices(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddControllers();

var app = builder.Build();

try
{
    // Wait for database to be ready and apply migrations
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        
        // Retry logic for database connection
        var maxRetries = 30;
        var delay = TimeSpan.FromSeconds(2);
        
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                logger.LogInformation("Attempting to connect to database (attempt {Attempt}/{MaxRetries})...", i + 1, maxRetries);
                await context.Database.MigrateAsync();
                logger.LogInformation("Database migration completed successfully.");
                break;
            }
            catch (Exception ex) when (i < maxRetries - 1)
            {
                logger.LogWarning("Database not ready yet: {Message}. Retrying in {Delay} seconds...", ex.Message, delay.TotalSeconds);
                await Task.Delay(delay);
            }
        }
        
        // Seed admin user
        await DbInitializer.SeedAdminUserAsync(userManager);
        logger.LogInformation("Admin user seeding completed.");
        
        await DbInitializer.SeedProductsAsync(context);
        logger.LogInformation("Database seeding completed.");
    }

    app.UseExceptionHandlingMiddleware();
    app.UseStaticFiles();
    app.UseRouting();
    app.UseCors("AllowAll");
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();

    await app.RunAsync();
}
catch (Exception ex)
{
    Console.WriteLine("App crashed with exception:");
    Console.WriteLine(ex);
}
