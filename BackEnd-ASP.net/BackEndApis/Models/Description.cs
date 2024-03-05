using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Description
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Title { get; set; }

    public string? Description1 { get; set; }

    public string? Image {  get; set; }
    public virtual Product? IdProductNavigation { get; set; }
}
