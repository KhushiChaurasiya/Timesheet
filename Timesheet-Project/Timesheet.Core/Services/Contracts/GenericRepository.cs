using Microsoft.EntityFrameworkCore;
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
        public IEnumerable<T> GetAll()
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
        public Employee GetByEmailId(string EmailId)
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

        public void Delete(T entity)
        {
            var obj = _context.Remove(entity);
            if (obj != null)
            {
                _context.SaveChangesAsync();
            }
        }
        public void Update(T entity)
        {
            var obj = _context.Update(entity);
            if (obj != null) _context.SaveChanges();
        }
    }
}
