using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Data
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        Task CommitAsync();
    }
}
