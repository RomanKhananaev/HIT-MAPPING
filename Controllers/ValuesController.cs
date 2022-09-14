﻿using HIT_MAPPING.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("GetBuildings")]
        public async Task<IActionResult> GetBuildings()
        {
            var qr = await _database.Buildings
                .Select(x => new { 
            x.Id,
            x.Number
                }).ToListAsync();
           return Ok(qr);
        }

        [HttpPost("GetRooms")]
        public async Task<IActionResult> GetRooms(buildingDto building)
        {
            var qr = await _database.Rooms
                .Include(x => x.RoomType)
                .Include(x => x.Building)
                .Select(x => new {
                    x.Id,
                    x.BuildingId,
                    x.Floor,
                    x.RoomNumber,
                    x.RoomType,
                    x.Building,
                })
                .Where(x=> x.Building.Number == building.Id)
                .ToListAsync();
            return Ok(qr);
        }

    }

    public struct buildingDto
    {
        public int Id { get; set; }
    }
}
