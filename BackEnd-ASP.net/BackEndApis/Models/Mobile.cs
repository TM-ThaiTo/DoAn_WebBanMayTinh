using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Mobile
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Cameras { get; set; }

    public string? Color { get; set; }

    public string? DisplaySize { get; set; }

    public string? Operating { get; set; }

    public string? Rom { get; set; }

    public string? Ram { get; set; }

    public string? Pin { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
