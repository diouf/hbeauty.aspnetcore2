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
        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _db.Set<ServiceItem>()
                .Include(s=>s.Images)
                .Include(s=>s.Videos)
                .SingleOrDefaultAsync(o => !o.Deleted && o.Id == id);

            if(item == null)item = new ServiceItem();
            
            return Json(item);
        }
        
        [HttpPost]
        public async Task<IActionResult> Post( [FromBody] ServiceItem item)
        {
            if(item.Id == 0)
            {
                item.CreatedBy = "Dion";
                item.CreatedOn = DateTime.UtcNow;
                item.ModifiedBy = "Dion";
                item.ModifiedOn = DateTime.UtcNow;

                await  _db.Set<ServiceItem>().AddAsync(item);
            }
            else
            {
                item.ModifiedBy = "Dion";
                item.ModifiedOn = DateTime.UtcNow;
                _db.Entry(item);
            }

            await _db.SaveChangesAsync();
            return Json(item);
        }
    }
}
