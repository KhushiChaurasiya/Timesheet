using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Core.ViewModel;
using Timesheet.Data.Entities;

namespace Timesheet.Core.Services.Contracts
{
    public interface IEmployeeServices
    {
        Task<List<Employee>> GetAll();
        Employee GetByEmail(object email);
        void Add(EmployeeDTO entity);
        void Update(EmployeeDTO entity);
        void Delete(object id);
    }
}
