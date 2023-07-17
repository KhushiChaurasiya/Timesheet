using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data.Entities;
using Timesheet.Data.Repository.Contracts;
using Timesheet.Data.Repository;
using Timesheet.Data;

namespace Timesheet.Core.Services.Contracts
{
    public class TaskRepository : GenericRepository<ProjectTask>, ITaskRepository
    {
        public TaskRepository(DatabaseContext context) : base(context) { }
    }
}
