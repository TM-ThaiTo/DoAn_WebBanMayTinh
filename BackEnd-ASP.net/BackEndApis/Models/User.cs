using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class User
{
    public int Id { get; set; }

    public int? AccountId { get; set; }

    public string? FullName { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Verify> Verifies { get; set; } = new List<Verify>();
}
