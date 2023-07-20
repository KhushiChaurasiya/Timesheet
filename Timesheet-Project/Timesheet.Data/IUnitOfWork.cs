using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Data
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        IProjectRepository Project { get; }
        ITaskRepository Task { get; }
        IWorkplaceRepository Workplace { get; }
        IReasonRepository Reason { get; }
        Task CommitAsync();
    }
}
