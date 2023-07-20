using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data;
using Timesheet.Data.Entities;
using Timesheet.Data.Repository.Contracts;
using Timesheet.Data.Repository;

namespace Timesheet.Core.Services.Contracts
{
    public class ReasonRepository : GenericRepository<Reason>, IReasonRepository
    { 
        public ReasonRepository(DatabaseContext context) : base(context) { }
    }
}
