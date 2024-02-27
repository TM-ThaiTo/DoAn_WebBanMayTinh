using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Account
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string? Password { get; set; }

    public string? GoogleId { get; set; }

    public string? AuthType { get; set; }

    public int? FailedLoginTimes { get; set; }

    public string? RefreshToken { get; set; }

    public virtual ICollection<Deliveryaddress> Deliveryaddresses { get; set; } = new List<Deliveryaddress>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
