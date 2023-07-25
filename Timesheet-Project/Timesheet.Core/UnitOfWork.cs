using Timesheet.Core.Services.Contracts;
using Timesheet.Data.Repository;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext _context;
        public UnitOfWork(DatabaseContext context)
        {
            _context = context;
        }
        public IEmployeeRepository Employee => new EmployeeRepository(_context);
        public IProjectRepository Project => new ProjectRepository(_context);
        public ITaskRepository Task => new TaskRepository(_context);
        public IWorkplaceRepository Workplace => new WorkplaceRepository(_context);
        public IReasonRepository Reason => new ReasonRepository(_context); 
        public ITimesheetTrackerRepository TimesheetTracker => new TimesheetTrackerRepository(_context);
        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
