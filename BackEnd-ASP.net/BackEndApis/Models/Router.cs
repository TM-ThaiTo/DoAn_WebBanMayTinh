using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Router
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Bandwidth { get; set; }

    public string? Strong { get; set; }

    public string? NumberOfPort { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
