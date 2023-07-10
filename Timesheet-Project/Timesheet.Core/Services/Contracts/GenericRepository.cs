using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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


        public void Add(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(object id)
        {
            var entity = Get(id);
            if (entity != null)
            {
                if (_context.Entry(entity).State == EntityState.Detached)
                {
                    _dbSet.Attach(entity);
                }
                _dbSet.Remove(entity);
            }
        }

        public T Get(object id)
        {
            var x = _dbSet.Find(id);
            return x;
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.AsEnumerable();
        }

        public T GetByEmail(string EmailId)
        {
            var d = _context.Employee.Where(x => x.EmailId == EmailId).AsEnumerable();
            return (T)d;
        }

        //public T GetByEmail(string EmailId)
        //{

        //    //var x= _context.Set<T>().Find(EmailId);
        //    var x = _dbSet.Where(x.);
        //    return x;
        //}

        public void Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
