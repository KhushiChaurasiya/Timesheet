using Microsoft.AspNetCore.Mvc;
using Timesheet.Core.ViewModel;
using Timesheet.Data;
using Timesheet.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork _repository;

        public ProjectController(IUnitOfWork repository)
        {
            _repository = repository;
        }

        // GET: api/<ProjectController>
        [HttpGet]
        public async Task<IEnumerable<Project>> GetAll()
        {
            var response = await _repository.Project.GetAll();
            return response.OrderByDescending(x => x.AddedOn); 
        }

        //// GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
          var response = _repository.Project.GetById(id);
            return Ok(response);
        }

        // POST api/<ProjectController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProjectDTO project)
        {
            var entity = new Project
            {
                Code = project.Code,
                Name = project.Name,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                CreatedBy = project.CreatedBy,
            };
            await _repository.Project.Create(entity);
            return Ok(project);
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ProjectDTO project)
        {
            ProjectDTO model = project;
            var entity = new Project
            {
                Id = model.Id,
                Code = model.Code,
                Name = model.Name,
                Description = model.Description,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                CreatedBy = model.CreatedBy,
            };
            
            _repository.Project.Update(entity);
            return Ok(project);

        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
             _repository.Project.Delete(id);
            return Ok();
        }
    }
}
