using Microsoft.AspNetCore.Mvc;
using Timesheet.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReasonController : ControllerBase
    {
        private readonly IUnitOfWork _repository;
        private readonly DatabaseContext _context;

        public ReasonController(IUnitOfWork repository, DatabaseContext context)
        {
            _repository = repository;
            _context = context;
        }

        // GET: api/<ReasonController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _repository.Reason.GetAll();
            return Ok(response);
        }

        //// GET api/<ReasonController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<ReasonController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ReasonController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ReasonController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
