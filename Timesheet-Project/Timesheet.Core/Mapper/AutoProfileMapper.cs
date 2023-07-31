using AutoMapper;
using Timesheet.Core.ViewModel;
using Timesheet.Data.Entities;

namespace Timesheet.Core.Mapper
{
    public class AutoProfileMapper : Profile
    {
        public AutoProfileMapper()
        {
            CreateMap<Employee, EmployeeDTO>();
            CreateMap<EmployeeDTO, Employee>();
            CreateMap<Project, ProjectDTO>();
            CreateMap<ProjectDTO,Project>();
            CreateMap<ProjectTaskDTO, ProjectTask>();
            CreateMap<ProjectTask, ProjectTaskDTO>();
            CreateMap<Reason, ReasonDTO>();
            CreateMap<ReasonDTO, Reason>();
            CreateMap<Workplace, WorkplaceDTO>();
            CreateMap<WorkplaceDTO, Workplace>();
            CreateMap<TimesheetTracker, TimesheetTrackerDTO>();
            CreateMap<TimesheetTrackerDTO, TimesheetTracker>();
        }
    }
}
