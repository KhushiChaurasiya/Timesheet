using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Data.Model
{
    public class TaskResponse
    {
        public int Id { get; set; }
        public string Taskname { get; set; }
        public string esthrs { get; set; }
    }
}
