using Timesheet.Data.Entities;

namespace Timesheet.Data.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<IEnumerable<T>> GetAll();
        public Task<T> GetById(int Id);
        public Task<Employee> GetByEmailId(string EmailId);
        public Task<T> Create(T entity);
        public void Delete(T entity);
        public void Update(T entity);
    }
}
