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
    public class TimesheetTrackerAllDTO
    {
        public ProjectDTO ProjectDTOs { get; set; }
        public WorkplaceDTO WorkplaceDTOs { get; set; }
        public ReasonDTO ReasonDTOs { get; set; }

        public ProjectTaskDTO ProjectTaskDTOs { get; set; }

        public List<DateAndTimeDTO> DateAndTimeDTOs { get; set; }

    }


    public class DateAndTimeDTO
    {
        public DateTime Dates { get; set; }
        public string Times { get; set; }
        public string Description { get; set; }
        public bool isSubmitted { get; set; }
        public string CreatedBy { get; set; }
    }

    public class WorkplacebyIdDTO
    {
        public int workplaceId { get; set; }
        public string Name { get; set; }
    }

    public class ReasonbtIdDTO
    {
        public int reasonId { get; set; }
        public string Name { get; set; }
    }
    public class ProjectTaskByIdDTO
    {
        public int taskId { get; set; }
        public string TaskName { get; set; }
    }
}
