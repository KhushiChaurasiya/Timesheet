using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using Timesheet.Data.Entities;
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
            var obj = _context.Project.Where(x => x.Name == Name || x.Code == ProjectId).ToList();
            if (obj != null)
            {
                throw new DuplicateNameException("Project is already exists");
            }
        }

        //public async Task<List<ProjectTask>> GetAllTask()
        //{
        //    DbSet<ProjectTask>? res = _context.ProjectTask;
        //    var Obj = res.Include(_ => _.Projects).ToList();
        //    //var res = await _context.ProjectTask.Include(_ => _.Projects).ToListAsync();
        //    if (Obj != null) return Obj;
        //    else return null;
        //}

        public async Task<List<ProjectTask>> GetAllTask()
        {
            DbSet<ProjectTask>? res = _context.ProjectTask;
            var Obj = res.Include(_ => _.Projects).ToList();
            //var res = await _context.ProjectTask.Include(_ => _.Projects).ToListAsync();
            if (Obj != null) return Obj;
            else return null;
        }

        public async Task<List<string>> GetAllTaskName()
        {
            var Obj = _context.ProjectTask.Select(x => x.TaskName.ToLower()).ToList();
            if (Obj != null) return Obj;
            else return null;
        }

        public void ValidateTaskDuplication(int projectId, string taskName)
        {
            var obj = _context.ProjectTask.Any(x => (x.ProjectId == projectId && x.TaskName == taskName));
            if (obj == true)
            {
                throw new DuplicateNameException("Task is already exists");
            }
        }
    }
}
