using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data.Entities;

namespace Timesheet.Core.Services.Contracts
{
    public interface IEmployeeServices
    {
        Task<List<Employee>> GetAll();
        Employee GetByEmail(object email);
        void Add(Employee entity);
        void Update(Employee entity);
        void Delete(object id);
    }
}
