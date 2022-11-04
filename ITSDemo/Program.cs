using ITSDemo.Models;
using ITSDemo.Repository;
using ITSDemo.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });


var policyName = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
                      builder =>
                      {
                          builder
                            .WithOrigins("http://localhost:8081")
                            .AllowCredentials() // specifying the allowed origin
                            .AllowAnyMethod() // defining the allowed HTTP method
                            .AllowAnyHeader(); // allowing any header to be sent
                      });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<CustomerContext>(options => options.UseSqlServer(connectionString));


builder.Services.AddScoped<ICustomerService, CustomerService>();

builder.Services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Customer/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


app.UseCors(policyName);

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Customer}/{action=Index}/{id?}");

app.Run();
