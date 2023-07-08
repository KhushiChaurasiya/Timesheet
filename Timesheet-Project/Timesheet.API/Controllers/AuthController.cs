using Microsoft.AspNetCore.Mvc;
using Timesheet.Core.Services.Contracts;
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
            return employee;
        }

        // GET api/<AuthController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AuthController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
