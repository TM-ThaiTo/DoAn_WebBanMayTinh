using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Keyboard
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Type { get; set; }

    public string? Color { get; set; }

    public string? LedColor { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
