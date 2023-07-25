using Microsoft.AspNetCore.Mvc;
using Timesheet.Core.ViewModel;
using Timesheet.Data;
using Timesheet.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesheetTrackerController : ControllerBase
    {

        private readonly IUnitOfWork _repository;
        private readonly DatabaseContext _context;

        public TimesheetTrackerController(IUnitOfWork repository, DatabaseContext context)
        {
            _repository = repository;
            _context = context;
        }

        // GET: api/<TimesheetTrackerController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<TimesheetTrackerController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<TimesheetTrackerController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] TimesheetTrackerDTO tracker)
        {
            var entity = new TimesheetTracker
            {
               ProjectId = tracker.ProjectId,
               TaskId = tracker.TaskId,
               TaskDescription = tracker.TaskDescription,
               ReasonId = tracker.ReasonId,
               WorkplaceId = tracker.WorkplaceId,
               Dates = tracker.Dates,
               Times = tracker.Times,
               CreatedBy = tracker.CreatedBy,
               IsSaved = tracker.IsSaved,
               IsSubmitted = tracker.IsSubmitted,
               
            };
            await _repository.TimesheetTracker.Create(entity);
            return Ok(tracker);
        }

        // PUT api/<TimesheetTrackerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TimesheetTrackerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
