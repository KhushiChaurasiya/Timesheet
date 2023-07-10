using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data.Entities;

namespace Timesheet.Data.Repository.Contracts
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
    }
}
