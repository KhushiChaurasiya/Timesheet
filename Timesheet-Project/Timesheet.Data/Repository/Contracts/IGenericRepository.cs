using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Data.Entities;

namespace Timesheet.Data.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(object id);
        //T GetByEmail(string email);

        T GetByEmail(string EmailId);

        void Add(T entity);
        void Update(T entity);
        void Delete(object id);
    }
}
