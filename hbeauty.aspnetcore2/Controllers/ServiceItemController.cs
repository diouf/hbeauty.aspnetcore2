using hbeauty.aspnetcore2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hbeauty.aspnetcore2.Controllers
{
    public class ServiceItemController: Controller
    {
        private DatabaseContext _db;
        public ServiceItemController(DatabaseContext db)
        {
            _db = db;
        }

        [Route("api/GetAllServiceItem")]
        public IEnumerable<ServiceItem> GetAll()
        {
            var list = _db.Set<ServiceItem>()
                .Where(o => !o.Deleted)
                .OrderByDescending(o => o.ModifiedOn)
                .ToList();

            return list;
        }

        public IActionResult List()
        {
            /*
            var r = new Random();
            var order = r.Next(100);
            var newItem = new ServiceItem();
            newItem.Name_Chs = $"a{order}_Chs";
            newItem.Name_Cht = $"a{order}_Cht";
            newItem.Name_Eng = $"a{order}_Eng";
            newItem.Description = $"Desc{order}";

            _db.Add(newItem);
            _db.SaveChanges();
            */
            var list = _db.Set<ServiceItem>()
                .Where(o => !o.Deleted)
                .OrderByDescending(o => o.ModifiedOn)
                .ToList();

            return View(list);
        }


    }
}
