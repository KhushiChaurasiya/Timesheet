using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Data.Entities
{
    public class TimesheetTracker : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        // Foreign key   
        [Display(Name = "Project")]
        public virtual int ProjectId { get; set; }

        [ForeignKey("Id")]
        public virtual Project Projects { get; set; }

        // Foreign key   
        [Display(Name = "ProjectTask")]
        public virtual int TaskId { get; set; }

        [ForeignKey("Id")]
        public virtual ProjectTask ProjectTask { get; set; }
       
        public string TaskDescription { get; set; }

        // Foreign key   
        [Display(Name = "Workplace")]
        public virtual int WorkplaceId { get; set; }

        [ForeignKey("Id")]
        public virtual Workplace Workplace { get; set; }

        // Foreign key   
        [Display(Name = "Reason")]
        public virtual int ReasonId { get; set; }

        [ForeignKey("Id")]
        public virtual Reason Reason { get; set; }
        public DateTime Dates { get; set;}

        [DataType(DataType.Time)]
        public TimeSpan Times { get; set;}
        public string CreatedBy { get; set;}
        public bool IsSaved { get; set;}
        public bool IsSubmitted { get; set;}

    }
}
