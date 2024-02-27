using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Display
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Capacity { get; set; }

    public string? Warranty { get; set; }

    public string? Manufacturer { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
