using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using Timesheet.Data.Entities;
using Timesheet.Data.Model;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DatabaseContext _context;
        private readonly DbSet<T> _dbSet;
        public GenericRepository(DatabaseContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            return _dbSet.AsEnumerable();
        }
        public T GetById(int Id)
        {
            if (Id != 0)
            {
                var Obj = _dbSet.Find(Id);
                if (Obj != null) return Obj;
                else return null;
            }
            else
            {
                return null;
            }
        }

        public async Task<Project> GetByProjectName(string proName)
        {
            if (proName != null)
            {
                DbSet<Project>? taskd = _context.Project;
                var Obj = taskd.FirstOrDefault(x => x.Name == proName);
                if (Obj != null) return Obj;
                else return null;
            }
            else
            {
                return null;
            }
        }
        public async Task<Employee> GetByEmailId(string EmailId)
        {
            if (EmailId != null)
            {
                DbSet<Employee>? employee = _context.Employee;
                var Obj = employee.FirstOrDefault(x => x.EmailId == EmailId);
                if (Obj != null) return Obj;
                else return null;
            }
            else
            {
                return null;
            }
        }
        public async Task<T> Create(T entity)
        {
            var obj = _context.Add<T>(entity);
            await _context.SaveChangesAsync();
            return obj.Entity;
        }

        public void Delete(int id)
        {
            //var obj = _context.Remove(id);
            //if (obj != null)
            //{
            //    _context.SaveChangesAsync();
            //}

            var entity = GetById(id);
            if (entity != null)
            {
                if (_context.Entry(entity).State == EntityState.Detached)
                {
                    _dbSet.Attach(entity);
                }
                _dbSet.Remove(entity);
                _context.SaveChangesAsync();
            }
        }
        public void Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChangesAsync();
        }
        public void ValidateByIDAndName(string Name, string ProjectId)
        {

            var obj = _context.Project?.Any(x => (x.Name == Name || x.Code == ProjectId));
            if (obj == true)
            {
                throw new DuplicateNameException("Project is already exists");
            }
        }
        public async Task<List<ProjectTask>> GetAllTask()
        {
            DbSet<ProjectTask>? res = _context.ProjectTask;
            var Obj = res.Include(_ => _.Projects).ToList();
            if (Obj != null) return Obj;
            else return null;
        }

        public async Task<List<TaskResponse>> GetAllTaskName(string ProjectName)
        {
            var ProId = _context.Project?.FirstOrDefault(x => x.Name == ProjectName);
            if (ProId != null)
            {
                var ProjectTaskList = _context.ProjectTask?.Where(a => a.ProjectId == ProId.Id).ToList();
                var Obj = ProjectTaskList?.Select(x => new TaskResponse() {Taskname= x.TaskName.ToLower(), Id= x.Id, esthrs= x.Estimationhrs }).ToList();
                if (Obj != null) return Obj;
            }
            return null;
        }

        public void ValidateTaskDuplication(int projectId, string taskName)
        {
            var obj = _context.ProjectTask?.Any(x => (x.ProjectId == projectId && x.TaskName == taskName));
            if (obj == true)
            {
                throw new DuplicateNameException("Task is already exists");
            }
        }

        public async Task<List<TimesheetTracker>> GetAllTimesheet(string Username)
        {
            DbSet<TimesheetTracker>? res = _context.TimesheetTracker;
            var Obj = res.Where(x=>x.CreatedBy == Username).Include(_ => _.Projects).Include(w=>w.Workplace).Include(r=>r.Reason).Include(t=>t.ProjectTask).OrderBy(x=>x.Dates).ToList();
            if (Obj != null) return Obj;
            else return null;
        }

        public List<TimesheetTracker> GetByDates(DateTime dates)
        {
            if (dates != null)
            {
                var Obj = _context.TimesheetTracker.Where(x=>x.Dates == dates).ToList();
                if (Obj != null) return Obj;
                else return null;
            }
            else
            {
                return null;
            }
        }
        

    }
}
