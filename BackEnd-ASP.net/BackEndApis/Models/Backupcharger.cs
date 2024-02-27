using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Backupcharger
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Capacity { get; set; }

    public string? Weight { get; set; }

    public string? NumberOfPort { get; set; }

    public string? Color { get; set; }

    public string? Voltage { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
