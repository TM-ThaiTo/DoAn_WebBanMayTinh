/*using System;*/
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEndApis.Models;

public partial class DbWebBanMayTinhContext : DbContext
{
    public DbWebBanMayTinhContext()
    {
    }

    public DbWebBanMayTinhContext(DbContextOptions<DbWebBanMayTinhContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Backupcharger> Backupchargers { get; set; }

    public virtual DbSet<Camera> Cameras { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Deliveryaddress> Deliveryaddresses { get; set; }

    public virtual DbSet<Description> Descriptions { get; set; }

    public virtual DbSet<Disk> Disks { get; set; }

    public virtual DbSet<Display> Displays { get; set; }

    public virtual DbSet<Flashsale> Flashsales { get; set; }

    public virtual DbSet<Headphone> Headphones { get; set; }

    public virtual DbSet<Keyboard> Keyboards { get; set; }

    public virtual DbSet<Laptop> Laptops { get; set; }

    public virtual DbSet<Mainboard> Mainboards { get; set; }

    public virtual DbSet<Mobile> Mobiles { get; set; }

    public virtual DbSet<Monitor> Monitors { get; set; }

    public virtual DbSet<Mouse> Mouses { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderprod> Orderprods { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Ram> Rams { get; set; }

    public virtual DbSet<Router> Routers { get; set; }

    public virtual DbSet<Speaker> Speakers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Verify> Verifys { get; set; }

    public virtual DbSet<Webcam> Webcams { get; set; }

/*    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=;database=DB_WebBanMayTinh");*/

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("accounts");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.AuthType)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("authType");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FailedLoginTimes)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("failedLoginTimes");
            entity.Property(e => e.GoogleId)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("googleId");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
            entity.Property(e => e.RefreshToken)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("refreshToken");
        });

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("admins");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("address");
            entity.Property(e => e.Age)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("age");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("email");
            entity.Property(e => e.Fb)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("fb");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("fullName");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.UserName)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("userName");
        });

        modelBuilder.Entity<Backupcharger>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("backupchargers");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Capacity)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("capacity");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Color)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("color");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.NumberOfPort)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("number_of_port");
            entity.Property(e => e.Voltage)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("voltage");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");
            entity.Property(e => e.Weight)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("weight");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Backupchargers)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("backupchargers_ibfk_1");
        });

        modelBuilder.Entity<Camera>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cameras");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Aperture)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("aperture");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Details)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("details");
            entity.Property(e => e.FocalLength)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("focal_length");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.NumberOfPixel)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("number_of_pixel");
            entity.Property(e => e.Resolution)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("resolution");
            entity.Property(e => e.Sensor)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("sensor");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Cameras)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("cameras_ibfk_1");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("carts");

            entity.HasIndex(e => e.IdProduct, "idProduct");

            entity.HasIndex(e => e.IdUser, "idUser");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("idProduct");
            entity.Property(e => e.IdUser)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("idUser");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Carts)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("carts_ibfk_2");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Carts)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("carts_ibfk_1");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("comments");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Author)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("author");
            entity.Property(e => e.Content)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Rate)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("rate");
            entity.Property(e => e.Time)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("timestamp")
                .HasColumnName("time");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Comments)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("comments_ibfk_1");
        });

        modelBuilder.Entity<Deliveryaddress>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("deliveryaddress");

            entity.HasIndex(e => e.Userid, "userid");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("address");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.Userid)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("userid");

            entity.HasOne(d => d.User).WithMany(p => p.Deliveryaddresses)
                .HasForeignKey(d => d.Userid)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("deliveryaddress_ibfk_1");
        });

        modelBuilder.Entity<Description>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("descriptions");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Description1)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("title");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Descriptions)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("descriptions_ibfk_1");
        });

        modelBuilder.Entity<Disk>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("disks");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Capacity)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("capacity");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.ConnectionStd)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("connection_std");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Size)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("size");
            entity.Property(e => e.Speed)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("speed");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("type");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Disks)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("disks_ibfk_1");
        });

        modelBuilder.Entity<Display>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("displays");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Capacity)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("capacity");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Manufacturer)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("manufacturer");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Displays)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("displays_ibfk_1");
        });

        modelBuilder.Entity<Flashsale>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("flashsales");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.PriceSales)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("priceSales");
            entity.Property(e => e.TimeEnd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("timestamp")
                .HasColumnName("timeEnd");
            entity.Property(e => e.TimeStart)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("timestamp")
                .HasColumnName("timeStart");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("title");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Flashsales)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("flashsales_ibfk_1");
        });

        modelBuilder.Entity<Headphone>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("headphones");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.ConnectionStd)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("connection_std");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("type");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Headphones)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("headphones_ibfk_1");
        });

        modelBuilder.Entity<Keyboard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("keyboards");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Color)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("color");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.LedColor)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("led_color");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("type");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Keyboards)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("keyboards_ibfk_1");
        });

        modelBuilder.Entity<Laptop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("laptops");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Cpu)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("cpu");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.Disk)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("disk");
            entity.Property(e => e.Display)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("display");
            entity.Property(e => e.DisplaySize)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("display_size");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Operating)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("operating");
            entity.Property(e => e.Pin)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("pin");
            entity.Property(e => e.Ram)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("ram");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");
            entity.Property(e => e.Weight)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("weight");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Laptops)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("laptops_ibfk_1");
        });

        modelBuilder.Entity<Mainboard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("mainboards");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Chipset)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("chipset");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Series)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("series");
            entity.Property(e => e.SizeStd)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("size_std");
            entity.Property(e => e.SocketType)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("socket_type");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Mainboards)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("mainboards_ibfk_1");
        });

        modelBuilder.Entity<Mobile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("mobiles");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Cameras)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("cameras");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Color)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("color");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.DisplaySize)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("display_size");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Operating)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("operating");
            entity.Property(e => e.Pin)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("pin");
            entity.Property(e => e.Ram)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("ram");
            entity.Property(e => e.Rom)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("rom");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Mobiles)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("mobiles_ibfk_1");
        });

        modelBuilder.Entity<Monitor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("monitors");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.BgPlate)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("bg_plate");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.DisplaySize)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("display_size");
            entity.Property(e => e.Frequency)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("frequency");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Port)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("port");
            entity.Property(e => e.Resolution)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("resolution");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Monitors)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("monitors_ibfk_1");
        });

        modelBuilder.Entity<Mouse>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("mouses");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.IsLed)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("is_led");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("type");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Mice)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("mouses_ibfk_1");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.IdUser, "idUser");

            entity.HasIndex(e => e.OrderProd, "order_prod");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DeliveryAdd)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("delivery_add");
            entity.Property(e => e.IdUser)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("idUser");
            entity.Property(e => e.Note)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("note");
            entity.Property(e => e.NumOfProd)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("num_of_prod");
            entity.Property(e => e.OrderCode)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("order_code");
            entity.Property(e => e.OrderDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("timestamp")
                .HasColumnName("order_date");
            entity.Property(e => e.OrderProd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("order_prod");
            entity.Property(e => e.OrderStatus)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("order_status");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("payment_method");
            entity.Property(e => e.TransportFee)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("transport_fee");
            entity.Property(e => e.TransportMethod)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("transport_method");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("orders_ibfk_1");

            entity.HasOne(d => d.OrderProdNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrderProd)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("orders_ibfk_2");
        });

        modelBuilder.Entity<Orderprod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orderprods");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Discount)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("discount");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Orderprods)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("orderprods_ibfk_1");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("products");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Avt)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("avt");
            entity.Property(e => e.Brand)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("brand");
            entity.Property(e => e.Code)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("code");
            entity.Property(e => e.Discount)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("discount");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
            entity.Property(e => e.OtherInfo)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("other_info");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");
            entity.Property(e => e.Rate)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("rate");
            entity.Property(e => e.Stock)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("stock");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("type");
        });

        modelBuilder.Entity<Ram>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("rams");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Bus)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("bus");
            entity.Property(e => e.Capacity)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("capacity");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("type");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Rams)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("rams_ibfk_1");
        });

        modelBuilder.Entity<Router>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("routers");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Bandwidth)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("bandwidth");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.NumberOfPort)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("number_of_port");
            entity.Property(e => e.Strong)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("strong");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Routers)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("routers_ibfk_1");
        });

        modelBuilder.Entity<Speaker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("speakers");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.ConnectionPort)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("connection_port");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");
            entity.Property(e => e.Wattage)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("wattage");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Speakers)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("speakers_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.AccountId, "account_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.AccountId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("account_id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("address");
            entity.Property(e => e.Birthday)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("birthday");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("full_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("gender");

            entity.HasOne(d => d.Account).WithMany(p => p.Users)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("users_ibfk_1");
        });

        modelBuilder.Entity<Verify>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("verifys");

            entity.HasIndex(e => e.EmailId, "email_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("code");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("dateCreated");
            entity.Property(e => e.EmailId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("email_id");

            entity.HasOne(d => d.Email).WithMany(p => p.Verifies)
                .HasForeignKey(d => d.EmailId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("verifys_ibfk_1");
        });

        modelBuilder.Entity<Webcam>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("webcams");

            entity.HasIndex(e => e.IdProduct, "id_product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Catalogs)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("catalogs");
            entity.Property(e => e.ConnectionStd)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("connection_std");
            entity.Property(e => e.Details)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("details");
            entity.Property(e => e.FrameSpeed)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("frame_speed");
            entity.Property(e => e.IdProduct)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("id_product");
            entity.Property(e => e.Resolution)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("resolution");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("warranty");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Webcams)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("webcams_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
