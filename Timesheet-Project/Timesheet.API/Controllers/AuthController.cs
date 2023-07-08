using Microsoft.AspNetCore.Mvc;
using Timesheet.Core.Services.Contracts;
using Timesheet.Core.ViewModel;
using Timesheet.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IEmployeeServices _employeeServices;

        public AuthController(IEmployeeServices employeeServices)
        {
            _employeeServices = employeeServices;
        }

        // GET: api/<AuthController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Employee> employee = await _employeeServices.GetAll();
            return Ok(employee);
        }

        // GET api/<AuthController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AuthController>
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeDTO employee)
        {
            _employeeServices.Add(employee);
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
