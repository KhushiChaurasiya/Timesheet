using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Timesheet.Data.Entities;

namespace Timesheet.Core.ViewModel
{
    public class ProjectTaskDTO
    {
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CreatedBy { get; set; }
        // Foreign key   
        [Display(Name = "Project")]
        public virtual int ProjectId { get; set; }

        [ForeignKey("Id")]
        public virtual Project Projects { get; set; }
    }
}
