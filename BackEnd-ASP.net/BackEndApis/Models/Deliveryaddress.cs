using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Deliveryaddress
{
    public int Id { get; set; }

    public int? Userid { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public virtual Account? User { get; set; }
}
