using Microsoft.AspNetCore.Mvc;
using Timesheet.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkplaceController : ControllerBase
    {
        private readonly IUnitOfWork _repository;
        private readonly DatabaseContext _context;

        public WorkplaceController(IUnitOfWork repository, DatabaseContext context)
        {
            _repository = repository;
            _context = context;
        }
        // GET: api/<WorkplaceController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _repository.Workplace.GetAll();
            return Ok(response);
        }

        //// GET api/<WorkplaceController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<WorkplaceController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<WorkplaceController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<WorkplaceController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
