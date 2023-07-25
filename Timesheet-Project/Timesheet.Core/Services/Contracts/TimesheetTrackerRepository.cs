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
    public class TimesheetTrackerRepository : GenericRepository<TimesheetTracker>, ITimesheetTrackerRepository
    {
        public TimesheetTrackerRepository(DatabaseContext context) : base(context) { }
    }
}
