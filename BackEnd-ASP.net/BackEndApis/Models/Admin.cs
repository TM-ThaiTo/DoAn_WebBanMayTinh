using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? FullName { get; set; }

    public int? Age { get; set; }

    public string? Phone { get; set; }

    public string? Fb { get; set; }

    public string? Address { get; set; }
}
