using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Disk
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Capacity { get; set; }

    public string? Size { get; set; }

    public string? Type { get; set; }

    public string? ConnectionStd { get; set; }

    public int? readSpeed { get; set; }
    public int? writeSpeed { get; set; }
    public int? rpm { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
