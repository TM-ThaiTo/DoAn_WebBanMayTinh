using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Webcam
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? ConnectionStd { get; set; }

    public string? FrameSpeed { get; set; }

    public string? Resolution { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public int? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
