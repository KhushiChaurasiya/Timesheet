using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timesheet.Data.Entities
{
    public class ProjectTask : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string TaskName { get; set; }

        [Required]
        [StringLength(50)]
        public string TaskDescription { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string CreatedBy { get; set; }

        // Foreign key   
        [Display(Name = "Project")]
        public virtual int ProjectId { get; set; }

        [ForeignKey("Id")]
        public virtual Project Projects { get; set; }
    }
}
