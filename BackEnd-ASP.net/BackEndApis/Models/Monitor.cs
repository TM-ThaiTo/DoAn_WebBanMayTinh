using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Monitor
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? BgPlate { get; set; }

    public string? Resolution { get; set; }

    public string? DisplaySize { get; set; }

    public string? Frequency { get; set; }

    public string? Port { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
