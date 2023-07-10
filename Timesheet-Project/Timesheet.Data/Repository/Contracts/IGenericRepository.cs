using Timesheet.Data.Entities;

namespace Timesheet.Data.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        public IEnumerable<T> GetAll();
        public T GetById(int Id);
        public Employee GetByEmailId(string EmailId);
        public Task<T> Create(T entity);
        public void Delete(T entity);
        public void Update(T entity);
    }
}
