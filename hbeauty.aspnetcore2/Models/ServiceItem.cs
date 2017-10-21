using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hbeauty.aspnetcore2.Models
{
    public class ServiceItem: Model
    {
        public ServiceItem()
        {
            Images = new List<ServiceItemImage>();
            Videos = new List<ServiceItemVideo>();
        }

        public string Name_Cht { get; set; }
        public string Name_Chs { get; set; }
        public string Name_Eng { get; set; }

        public string Description { get; set; }
        public string Description_Eng { get; set; }

        public List<ServiceItemImage> Images { get; private set; }
        public List<ServiceItemVideo> Videos { get; private set; }
    }
}
