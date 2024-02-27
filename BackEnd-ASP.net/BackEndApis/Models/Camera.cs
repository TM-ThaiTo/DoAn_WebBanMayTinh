using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Camera
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public string? Aperture { get; set; }

    public string? FocalLength { get; set; }

    public string? Sensor { get; set; }

    public string? NumberOfPixel { get; set; }

    public string? Resolution { get; set; }

    public string? Warranty { get; set; }

    public string? Catalogs { get; set; }

    public string? Details { get; set; }

    public virtual Product? IdProductNavigation { get; set; }
}
