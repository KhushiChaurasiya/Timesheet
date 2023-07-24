using Timesheet.Data.Entities;

namespace Timesheet.Data.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<IEnumerable<T>> GetAll();
        public T GetById(int Id);
        public Task<Employee> GetByEmailId(string EmailId);
        public Task<T> Create(T entity);
        public void Delete(int id);
        public void Update(T entity);
        public Task<List<ProjectTask>> GetAllTask();
        public Task<List<string>> GetAllTaskName(string ProjectName);

        public void ValidateByIDAndName(string name, string ProjectId);

        public void ValidateTaskDuplication(int projectId, string taskName);
    }
}
