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
        public virtual int ProjectId { get; set; }
        public virtual int TaskId { get; set; }
        public string TaskDescription { get; set; }
        public virtual int WorkplaceId { get; set; }
        public virtual int ReasonId { get; set; }
        public DateTime Dates { get; set; }

        [DataType(DataType.Time)]
        public TimeSpan Times { get; set; }
        public string CreatedBy { get; set; }
        public bool IsSaved { get; set; }
        public bool IsSubmitted { get; set; }
    }
}
