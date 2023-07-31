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
    public class TimesheetTrackerDTO
    {
        public int Id { get; set; }
        //public virtual int ProjectId { get; set; }

        // Foreign key   
        //[Display(Name = "Project")]
        public virtual int ProjectId { get; set; }

        //[ForeignKey("Id")]
        //public virtual Project Projects { get; set; }
        // Foreign key   
        //[Display(Name = "ProjectTask")]
        public virtual int TaskId { get; set; }

        //[ForeignKey("Id")]
        //public virtual ProjectTask ProjectTask { get; set; }

        public string TaskDescription { get; set; }

        public virtual int WorkplaceId { get; set; }

        //[ForeignKey("Id")]
        //public virtual Workplace Workplace { get; set; }

        
        public virtual int ReasonId { get; set; }

        //[ForeignKey("Id")]
        //public virtual Reason Reason { get; set; }
        public DateTime Dates { get; set; }
        public string Times { get; set; }
        public string CreatedBy { get; set; }
        public bool IsSubmitted { get; set; }
    }
}
