using hbeauty.aspnetcore2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace hbeauty.aspnetcore2.Controllers
{
    [Route("api/[controller]")]
    public class FileController: Controller
    {
        private DatabaseContext _db;
        public FileController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpPost("UploadServiceItemImage")]
        public IActionResult UploadServiceItemImage(List<IFormFile> a)
        {
            var x = Request.Form.Files.First();

            var serviceItemId =  Request.Query["serviceItemId"].ToString();
            
            return Json(new{ serviceItemId = serviceItemId, files = Request.Form.Files.Count} );
        }
    }
}
