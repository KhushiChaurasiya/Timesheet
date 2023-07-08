using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Data.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        T Get(object id);
        T GetByEmail(object email);
        void Add(T entity);
        void Update(T entity);
        void Delete(object id);
    }
}
