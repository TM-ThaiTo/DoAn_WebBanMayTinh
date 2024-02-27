using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Verify
{
    public int Id { get; set; }

    public int? EmailId { get; set; }

    public string? Code { get; set; }

    public DateTime? DateCreated { get; set; }

    public virtual User? Email { get; set; }
}
