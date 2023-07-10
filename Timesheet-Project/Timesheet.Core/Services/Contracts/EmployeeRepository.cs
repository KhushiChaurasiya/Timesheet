using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data.Entities;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Data.Repository
{
    public class EmployeeRepository :GenericRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(DatabaseContext context) : base(context) { }
    }
}
