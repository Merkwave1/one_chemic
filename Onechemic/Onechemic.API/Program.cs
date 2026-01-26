using Core;
using Infrastructure;
using Infrastructure.DataSeeding;
using Infrastructure.persistence;
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
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await DbInitializer.SeedProductsAsync(context); // await if async
    }

    app.UseExceptionHandlingMiddleware();
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();
    app.UseCors("AllowAll");
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();

    await app.RunAsync(); // use RunAsync() to properly await
}
catch (Exception ex)
{
    Console.WriteLine("App crashed with exception:");
    Console.WriteLine(ex);
    Console.WriteLine("Press any key to exit...");
    Console.ReadKey();
}
