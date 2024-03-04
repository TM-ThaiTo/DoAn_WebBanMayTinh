using BackEndApis.Helper;
using BackEndApis.Models;
using BackEndApis.Services;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using CloudinaryDotNet;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// add Packet
builder.Services.AddAutoMapper(typeof(MappingProfile));

// add Helper
builder.Services.AddScoped<HashPassword>();
builder.Services.AddScoped<Info>();

//add Services
builder.Services.AddScoped<ServicesContex>();
builder.Services.AddScoped<AccountServices>();
builder.Services.AddScoped<LoginServices>();
builder.Services.AddScoped<AdminServices>();

// add Database
var connectionstring = builder.Configuration.GetConnectionString("AppDBConnectionString");
builder.Services.AddDbContext<DbWebBanMayTinhContext>(options => options.UseMySql(connectionstring, ServerVersion.AutoDetect(connectionstring)));

// Add Cloudinary Configuration
var cloudinarySettingsSection = builder.Configuration.GetSection("CloudinarySettings");
var cloudinarySettings = cloudinarySettingsSection.Exists() ? cloudinarySettingsSection.Get<CloudinarySettings>() : null;

if (cloudinarySettings != null && !string.IsNullOrWhiteSpace(cloudinarySettings.CloudName)
    && !string.IsNullOrWhiteSpace(cloudinarySettings.ApiKey)
    && !string.IsNullOrWhiteSpace(cloudinarySettings.ApiSecret))
{
    var cloudinaryAccount = new CloudinaryDotNet.Account(cloudinarySettings.CloudName, cloudinarySettings.ApiKey, cloudinarySettings.ApiSecret);
    var cloudinary = new Cloudinary(cloudinaryAccount);
    builder.Services.AddSingleton(cloudinary);
}

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

app.MapControllers();

app.Run();
