using BackEndApis.Helper;
using BackEndApis.Models;
using BackEndApis.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// add Helper
/*builder.Services.AddScoped<HelperContext>();*/
builder.Services.AddScoped<HashPassword>();

//add Services
builder.Services.AddScoped<ServicesContex>();
builder.Services.AddScoped<AccountServices>();
builder.Services.AddScoped<LoginServices>();
builder.Services.AddScoped<AdminServices>();

// add Database
var connectionstring = builder.Configuration.GetConnectionString("AppDBConnectionString");
builder.Services.AddDbContext<DbWebBanMayTinhContext>(options => options.UseMySql(connectionstring, ServerVersion.AutoDetect(connectionstring)));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyHeader() .AllowAnyMethod();
});

/*app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod());*/

app.MapControllers();

app.Run();
