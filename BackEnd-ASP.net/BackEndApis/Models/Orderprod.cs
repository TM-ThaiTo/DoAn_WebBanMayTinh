using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Orderprod
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Name { get; set; }

    public string? Price { get; set; }

    public string? Discount { get; set; }

    public virtual Product? IdProductNavigation { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
