using System.ComponentModel.DataAnnotations;

namespace Timesheet.Data
{
    public abstract class BaseEntity
    {
        [Key]
        public virtual int Id { get; set; }
        public virtual DateTime AddedOn { get; set; }
    }
}