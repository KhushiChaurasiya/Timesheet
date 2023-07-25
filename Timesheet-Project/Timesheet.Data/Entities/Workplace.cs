using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Timesheet.Data.Entities
{
    public class Workplace : BaseEntity
    {
        //[Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }
        [JsonIgnore]
        public List<TimesheetTracker> TimesheetTracker { get; set; }
    }
}
