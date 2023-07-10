using System.ComponentModel.DataAnnotations;

namespace Timesheet.Data.Entities
{
    public class Employee : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        [Required]
        [StringLength(50)]
        public string EmailId { get; set; }
    }
}
