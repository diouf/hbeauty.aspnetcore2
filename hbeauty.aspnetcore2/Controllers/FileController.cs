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
                var file = Request.Form.Files[0];
                var serviceItemId =  int.Parse(Request.Query["serviceItemId"].ToString());

                if (file.Length == 0) return Json(new{ done = false, msg = "无效文件"});

                using (MemoryStream ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    await AzureStorageService.UploadProductImage(file.FileName,ms);
                }

                var image = new ServiceItemImage();
                image.FileName = file.FileName;
                image.Url = "https://hbeauty.blob.core.windows.net/service-item-images/"+file.FileName;
                image.ServiceItemId = serviceItemId;
                image.Deleted = false;
                image.CreatedBy = "dion";
                image.CreatedOn = DateTime.UtcNow;
                image.ModifiedBy = "dion";
                image.ModifiedOn = DateTime.UtcNow;
                

                _db.Set<ServiceItemImage>().Add(image);
                await _db.SaveChangesAsync();

                return Json(new{ done = true, newImage = image } );
            }
            catch (Exception ex )
            {
                return Json(new{ done = false, msg = ex.Message} );
            }
        }

        [HttpDelete("DeleteSetviceItemImage/{id}")]
        public async Task<IActionResult> DeleteSetviceItemImage(int id)
        {
            var tmpModel = await _db.Set<ServiceItemImage>().SingleOrDefaultAsync(i=>i.Id == id);
            if(tmpModel == null) return Json(new{done=true});
            
            var fileName = tmpModel.FileName;

            if( !string.IsNullOrEmpty(fileName) ) await AzureStorageService.DeleteProductImage(fileName);
            
            _db.Set<ServiceItemImage>().Remove(tmpModel);
            await _db.SaveChangesAsync();
            
            return Json(new{done=true});
        }
    }
}
