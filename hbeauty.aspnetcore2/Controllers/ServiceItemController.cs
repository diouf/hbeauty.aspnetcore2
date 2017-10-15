using hbeauty.aspnetcore2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace hbeauty.aspnetcore2.Controllers
{
    //[Route("api/ServiceItem")]
    public class ServiceItemController: Controller
    {
        private DatabaseContext _db;
        public ServiceItemController(DatabaseContext db)
        {
            _db = db;
        }

        [Route("api/GetAllServiceItem")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await  _db.Set<ServiceItem>()
                .Where(o => !o.Deleted)
                .OrderByDescending(o => o.ModifiedOn)
                .ToListAsync();

            return Json(list);
        }
        
        [Route("api/ServiceItem/Post")]
        [HttpPost]
        public ServiceItem Post( [FromBody] ServiceItem item)
        {
            item.Id=123;
            return item;
        }

        public IActionResult List()
        {
            var list = _db.Set<ServiceItem>()
                .Where(o => !o.Deleted)
                .OrderByDescending(o => o.ModifiedOn)
                .ToList();

            return View(list);
        }
    }
}
