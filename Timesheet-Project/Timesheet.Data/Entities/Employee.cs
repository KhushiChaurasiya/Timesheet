using System.ComponentModel.DataAnnotations;

namespace Timesheet.Data.Entities
{
    public class Employee : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        [Required]
        [StringLength(50)]
        public string EmailId { get; set; }
        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }
    }
}
