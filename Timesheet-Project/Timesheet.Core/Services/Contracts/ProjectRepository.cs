using Timesheet.Data;
using Timesheet.Data.Entities;
using Timesheet.Data.Repository;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Core.Services.Contracts
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(DatabaseContext context) : base(context) { }
    }
}
