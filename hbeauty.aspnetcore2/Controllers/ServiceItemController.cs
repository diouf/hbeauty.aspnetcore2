using hbeauty.aspnetcore2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace hbeauty.aspnetcore2.Controllers
{
    [Route("api/[controller]")]
    public class ServiceItemController: Controller
    {
        private DatabaseContext _db;
        public ServiceItemController(DatabaseContext db)
        {
            _db = db;
        }

        //[Route("api/GetAllServiceItem")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await  _db.Set<ServiceItem>()
                .Include(s=>s.Images)
                .Include(s=>s.Videos)
                .Where(o => !o.Deleted)
                .OrderByDescending(o => o.ModifiedOn)
                .ToListAsync();
            
            return Json(list);
        }
        
        //[Route("api/ServiceItem/Post")]
        [HttpPost]
        public ServiceItem Post( [FromBody] ServiceItem item)
        {
            item.Id=123;
            return item;
        }
    }
}
