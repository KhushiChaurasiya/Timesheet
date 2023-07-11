using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Data
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        IProjectRepository Project { get; }
        Task CommitAsync();
    }
}
