using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Cryptography.X509Certificates;
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
            var obj = _context.Project.Where(x=>x.Name == Name || x.Code == ProjectId).ToList();
            if (obj != null)
            {
                throw new DuplicateNameException("Project is already added");
            } 
        }
    }
}
