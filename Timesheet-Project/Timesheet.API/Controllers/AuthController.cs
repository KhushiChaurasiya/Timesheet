using Microsoft.AspNetCore.Mvc;
using Timesheet.Core.ViewModel;
using Timesheet.Data;
using Timesheet.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _repository;

        public AuthController(IUnitOfWork repository)
        {
            _repository = repository;
        }

        // GET: api/<AuthController>
        [HttpGet]
        public async Task<IEnumerable<Employee>> GetAll()
        {
            return _repository.Employee.GetAll().AsEnumerable();
            //return (IEnumerable<Employee>)Ok(d);
        }

        // GET api/<AuthController>/5
        [HttpGet]
        [Route("GetEmpInfoByEmail")]
        public async Task<IActionResult> GetEmpInfoByEmail(string EmailId)
        {
            try
            {
                var response = _repository.Employee.GetByEmail(EmailId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponseDTO
                {
                    IsSuccess = false,
                    Errors = new string[] { ex.Message }
                });
            }
        }

        // POST api/<AuthController>
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeDTO employee)
        {
            var entity = new Employee
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                EmailId = employee.EmailId,
            };

            _repository.Employee.Add(entity);
            return Ok(employee);
        }

        // PUT api/<AuthController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
