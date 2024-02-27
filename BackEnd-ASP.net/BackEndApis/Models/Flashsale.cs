using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Flashsale
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? PriceSales { get; set; }

    public string? Title { get; set; }

    public DateTime? TimeStart { get; set; }

    public DateTime? TimeEnd { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
