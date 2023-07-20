using Timesheet.Data;
using Timesheet.Data.Entities;
using Timesheet.Data.Repository;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Core.Services.Contracts
{
    public class TaskRepository : GenericRepository<ProjectTask>, ITaskRepository
    {
        public TaskRepository(DatabaseContext context) : base(context) { }
    }
}
