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
            CreateMap<ProjectTaskDTO, ProjectTask>();
            CreateMap<Reason, ReasonDTO>();
            CreateMap<Workplace, WorkplaceDTO>();
            CreateMap<TimesheetTracker, TimesheetTrackerDTO>();
        }
    }
}
