using Microsoft.EntityFrameworkCore;
using Timesheet.Data.Entities;

namespace Timesheet.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var item in ChangeTracker.Entries<BaseEntity>().AsEnumerable())
            {
                item.Entity.CreatedOn = DateTime.Now;
            }
            return base.SaveChangesAsync(cancellationToken);
        }
        public DbSet<Employee>? Employee { get; set; }
        public DbSet<Project>? Project { get; set; }
        public DbSet<ProjectTask>? ProjectTask { get; set; }
        public DbSet<Workplace>? Workplace { get; set; }
        //public DbSet<Reason>? Reason { get; set; } 
        public DbSet<TimesheetTracker>? TimesheetTracker { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProjectTask>()
            .HasOne(_ => _.Projects)
            .WithMany(a => a.ProjectTask)
            .HasForeignKey(p => p.ProjectId);

            modelBuilder.Entity<TimesheetTracker>()
            .HasOne(_ => _.Projects)
            .WithMany(a => a.TimesheetTracker)
            .HasForeignKey(p => p.ProjectId);

            modelBuilder.Entity<TimesheetTracker>()
            .HasOne(_ => _.ProjectTask)
            .WithMany(a => a.TimesheetTracker)
            .HasForeignKey(p => p.TaskId);

            modelBuilder.Entity<TimesheetTracker>()
            .HasOne(_ => _.Workplace)
            .WithMany(a => a.TimesheetTracker)
            .HasForeignKey(p => p.WorkplaceId);

            modelBuilder.Entity<TimesheetTracker>()
           .HasOne(_ => _.Reason)
           .WithMany(a => a.TimesheetTracker)
           .HasForeignKey(p => p.ReasonId);
        }
    }
}
