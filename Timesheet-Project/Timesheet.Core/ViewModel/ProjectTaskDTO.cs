using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Timesheet.Data.Entities;

namespace Timesheet.Core.ViewModel
{
    public class ProjectTaskDTO
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public string CreatedBy { get; set; }

        // Foreign key   
        [Display(Name = "Project")]
        public virtual int ProjectId { get; set; }

        [ForeignKey("Id")]
        public virtual Project Projects { get; set; }
    }
}
