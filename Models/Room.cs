﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HIT_MAPPING.Models
{
    [Table("rooms")]
    public partial class Room
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("building_id")]
        public int BuildingId { get; set; }
        [Column("floor")]
        public int Floor { get; set; }
        [Column("room_number")]
        [StringLength(50)]
        public string? RoomNumber { get; set; }
        [Column("room_type_id")]
        public int RoomTypeId { get; set; }

        [ForeignKey("BuildingId")]
        [InverseProperty("Rooms")]
        public virtual Building Building { get; set; } = null!;
        [ForeignKey("RoomTypeId")]
        [InverseProperty("Rooms")]
        public virtual RoomType RoomType { get; set; } = null!;
    }
}