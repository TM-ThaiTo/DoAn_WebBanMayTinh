using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Mainboard
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Chipset { get; set; }

    public string? Series { get; set; }

    public string? SocketType { get; set; }

    public string? SizeStd { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
