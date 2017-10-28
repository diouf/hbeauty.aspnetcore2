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
    public class ServiceItemVideoController: Controller
    {
        private DatabaseContext _db;
        public ServiceItemVideoController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Post( [FromBody] ServiceItemVideo item)
        {
            
            item.CreatedBy = "Dion";
            item.CreatedOn = DateTime.UtcNow;
            item.ModifiedBy = "Dion";
            item.ModifiedOn = DateTime.UtcNow;

            _db.Set<ServiceItemVideo>().Add(item);
            await _db.SaveChangesAsync();
            
            return Json(item);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.Set<ServiceItemVideo>().SingleOrDefaultAsync(v=>v.Id == id);

            if(item == null) return Json(new{ done = true });

            _db.Set<ServiceItemVideo>().Remove(item);
            await _db.SaveChangesAsync();

            return Json(new{ done = true }); 
        }

    }
}