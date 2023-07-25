using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Timesheet.Data.Entities
{
    public class Project : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Code { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }

        [JsonIgnore]
        public List<ProjectTask> ProjectTask { get; set; }
        [JsonIgnore]
        public List<TimesheetTracker> TimesheetTracker { get; set; }
    }
}
