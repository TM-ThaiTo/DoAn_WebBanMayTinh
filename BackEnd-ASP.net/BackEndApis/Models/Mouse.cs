using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Mouse
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Type { get; set; }

    public string? IsLed { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
