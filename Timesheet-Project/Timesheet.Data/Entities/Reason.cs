using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Timesheet.Data.Entities
{
    public class Reason : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }

    }
}
