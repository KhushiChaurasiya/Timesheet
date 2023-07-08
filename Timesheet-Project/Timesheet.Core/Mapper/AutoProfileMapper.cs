using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Core.ViewModel;
using Timesheet.Data.Entities;

namespace Timesheet.Core.Mapper
{
    public class AutoProfileMapper : Profile
    {
        public AutoProfileMapper() {
            CreateMap<Employee, EmployeeDTO>();
            CreateMap<EmployeeDTO,Employee>();
        }
    }
}
