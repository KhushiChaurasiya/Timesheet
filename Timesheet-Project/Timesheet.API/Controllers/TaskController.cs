using Microsoft.AspNetCore.Mvc;
using Timesheet.Core.ViewModel;
using Timesheet.Data;
using Timesheet.Data.Entities;

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly IUnitOfWork _repository;

        public TaskController(IUnitOfWork repository)
        {
            _repository = repository;
        }

        // GET: api/<TaskController>
        [HttpGet]
        public async Task<IEnumerable<ProjectTask>> Get()
        {
            var response = await _repository.Task.GetAll();
            return response.OrderByDescending(x => x.CreatedOn);
        }

        //// GET api/<TaskController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = _repository.Task.GetById(id);
            return Ok(response);
        }

        // POST api/<TaskController>
        [HttpPost]
        public async Task<IActionResult> PostProjectTask([FromForm] ProjectTaskDTO task)
        {
            var entity = new ProjectTask
            {
                TaskName = task.TaskName,
                TaskDescription = task.TaskDescription,
                ProjectId = task.ProjectId,
                CreatedBy = task.CreatedBy,
            };
            await _repository.Task.Create(entity);
            return Ok(task);
        }
        // PUT api/<TaskController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TaskController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
