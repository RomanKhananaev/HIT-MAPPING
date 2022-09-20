using HIT_MAPPING.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace HIT_MAPPING.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly HITContext _database;

        public ValuesController(HITContext db)
        {
            _database = db;
        }


        [HttpGet("getData")]
        public async Task<IActionResult> getData()
        {
            string sourcePath = @"C:\Users\97252\Desktop\HIT_MAPPING\ClientApp\src\assets\map\data\index\scene.js";
            string targetPath = @"C:\Users\97252\Desktop\HIT_MAPPING\ClientApp\src\assets\map\data\index\database.json";

            if (!System.IO.File.Exists(targetPath))
            {
                var fileString = System.IO.File.ReadAllText(sourcePath);

                fileString = fileString.Remove(fileString.Length - 83);
                fileString = fileString.Remove(0, 19);
                System.IO.File.WriteAllText(targetPath, fileString);
                return BadRequest("Datafile was created and page will refresh");
            }

            return Ok();
        }



    }
}
