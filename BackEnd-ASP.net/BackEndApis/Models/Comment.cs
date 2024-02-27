using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Author { get; set; }

    public DateTime Time { get; set; }

    public string? Rate { get; set; }

    public string? Content { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
