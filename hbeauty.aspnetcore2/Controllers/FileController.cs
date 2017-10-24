using hbeauty.aspnetcore2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using hbeauty_aspnetcore2.Sevices;
using System.IO;
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
        public async Task<IActionResult> UploadServiceItemImage(List<IFormFile> a)
        {
            try
            {
                var files = Request.Form.Files;
                var serviceItemId =  int.Parse(Request.Query["serviceItemId"].ToString());

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            await AzureStorageService.UploadProductImage(file.FileName,ms);
                        }
                    }

                    var image = new ServiceItemImage();
                    
                    image.Url = "https://hbeauty.blob.core.windows.net/service-item-images/"+file.FileName;
                    image.ServiceItemId = serviceItemId;
                    image.Deleted = false;
                    image.CreatedBy = "dion";
                    image.CreatedOn = DateTime.UtcNow;
                    image.ModifiedBy = "dion";
                    image.ModifiedOn = DateTime.UtcNow;
                    

                    _db.Set<ServiceItemImage>().Add(image);
                    await _db.SaveChangesAsync();
                }

                return Json(new{ done=true} );
            }
            catch (Exception ex )
            {
                return Json(new{ done=false,message = ex.Message} );
            }
        }
    }
}
