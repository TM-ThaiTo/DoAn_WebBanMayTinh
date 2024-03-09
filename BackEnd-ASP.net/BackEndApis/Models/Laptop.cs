using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Laptop
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? chipBrand { get; set; }
    public string? processorCount { get; set; }
    public string? series {  get; set; }
    public string? detailCpu {  get; set; }

    public string? DisplaySize { get; set; }

    public string? Display { get; set; }

    public string? Operating { get; set; }

    public string? Disk { get; set; }

    public string? Ram { get; set; }

    public string? Pin { get; set; }

    public string? Weight { get; set; }

    public string? Catalogs { get; set; }

    public string? Warranty { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
