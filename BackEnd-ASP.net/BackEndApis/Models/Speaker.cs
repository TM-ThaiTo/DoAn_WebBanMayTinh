using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Speaker
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Wattage { get; set; }

    public string? ConnectionPort { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
