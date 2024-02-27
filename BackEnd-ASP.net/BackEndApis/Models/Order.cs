using System;
using System.Collections.Generic;

namespace BackEndApis.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? IdUser { get; set; }

    public int? OrderProd { get; set; }

    public string? DeliveryAdd { get; set; }

    public string? OrderCode { get; set; }

    public DateTime OrderDate { get; set; }

    public string? NumOfProd { get; set; }

    public string? OrderStatus { get; set; }

    public string? PaymentMethod { get; set; }

    public string? TransportFee { get; set; }

    public string? TransportMethod { get; set; }

    public string? Note { get; set; }

    public virtual User? IdUserNavigation { get; set; }

    public virtual Orderprod? OrderProdNavigation { get; set; }
}
