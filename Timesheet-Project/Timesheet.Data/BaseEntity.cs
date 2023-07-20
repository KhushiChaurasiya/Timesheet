using System.ComponentModel.DataAnnotations;

namespace Timesheet.Data
{
    public abstract class BaseEntity
    {
        public virtual DateTime? CreatedOn { get; set; }
    }
}