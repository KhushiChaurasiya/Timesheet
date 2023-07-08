using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Core.Services.Contracts;
using Timesheet.Core.ViewModel;
using Timesheet.Data.Entities;
using Timesheet.Data.Repository.Contracts;

namespace Timesheet.Core.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IGenericRepository<Employee> _repository;
        private IMapper Mapper { get; }
        public EmployeeServices(IGenericRepository<Employee> repository, IMapper _mapper)
        {
            _repository = repository;
            Mapper = _mapper;
        }

        public void Add(EmployeeDTO employee)
        {
            var entity = Mapper.Map<Employee>(employee);
           _repository.Add(entity);
        }

        public void Delete(object id)
        {
           _repository.Delete(id);
        }

        public async Task<List<Employee>> GetAll()
        {
           return await _repository.GetAll();
       
        }

        public Employee GetByEmail(object email)
        {
            return _repository.GetByEmail(email);
        }

        public void Update(EmployeeDTO employee)
        {
            var entity = Mapper.Map<Employee>(employee);
            _repository.Update(entity);
        }

    }
}
