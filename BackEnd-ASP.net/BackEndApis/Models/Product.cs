using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public string? Type { get; set; }

    public string? Brand { get; set; }

    public string? Avt { get; set; }

    public int? Stock { get; set; }

    public string? Discount { get; set; }

    public int? Rate { get; set; }

    public string? OtherInfo { get; set; }

    public virtual ICollection<Backupcharger> Backupchargers { get; set; } = new List<Backupcharger>();

    public virtual ICollection<Camera> Cameras { get; set; } = new List<Camera>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Description> Descriptions { get; set; } = new List<Description>();

    public virtual ICollection<Disk> Disks { get; set; } = new List<Disk>();

    public virtual ICollection<Display> Displays { get; set; } = new List<Display>();

    public virtual ICollection<Flashsale> Flashsales { get; set; } = new List<Flashsale>();

    public virtual ICollection<Headphone> Headphones { get; set; } = new List<Headphone>();

    public virtual ICollection<Keyboard> Keyboards { get; set; } = new List<Keyboard>();

    public virtual ICollection<Laptop> Laptops { get; set; } = new List<Laptop>();

    public virtual ICollection<Mainboard> Mainboards { get; set; } = new List<Mainboard>();

    public virtual ICollection<Mouse> Mice { get; set; } = new List<Mouse>();

    public virtual ICollection<Mobile> Mobiles { get; set; } = new List<Mobile>();

    public virtual ICollection<Monitor> Monitors { get; set; } = new List<Monitor>();

    public virtual ICollection<Orderprod> Orderprods { get; set; } = new List<Orderprod>();

    public virtual ICollection<Ram> Rams { get; set; } = new List<Ram>();

    public virtual ICollection<Router> Routers { get; set; } = new List<Router>();

    public virtual ICollection<Speaker> Speakers { get; set; } = new List<Speaker>();

    public virtual ICollection<Webcam> Webcams { get; set; } = new List<Webcam>();
}
