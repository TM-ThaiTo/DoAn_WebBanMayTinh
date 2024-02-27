using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Cart
{
    public int Id { get; set; }

    public int? IdUser { get; set; }

    public int? IdProduct { get; set; }

    public virtual Product? IdProductNavigation { get; set; }

    public virtual User? IdUserNavigation { get; set; }
}
