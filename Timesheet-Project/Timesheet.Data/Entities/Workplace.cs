using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Data.Entities
{
    public class Workplace : BaseEntity
    {
        [Key]
        public string Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }
    }
}
