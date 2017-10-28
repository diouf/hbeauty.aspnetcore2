using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hbeauty.aspnetcore2.Models
{
    public class ServiceItemImage: Model
    {
        public int ServiceItemId { get; set; }
        public string FileName { get; set; }
        public string Url { get; set; }

        public ServiceItem ServiceItem { get; set; }

    }
}
