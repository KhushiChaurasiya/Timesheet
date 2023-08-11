using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;
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
        private readonly IMapper _mapper;

        public TimesheetTrackerController(IUnitOfWork repository, DatabaseContext context, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<TimesheetTrackerController>
        [HttpGet]
        public async Task<IActionResult> Get(string Username)
        {
            var response = await _repository.TimesheetTracker.GetAllTimesheet(Username);

            TimesheetTrackerAllDTO dto = new TimesheetTrackerAllDTO();
            List<DateAndTimeDTO>  dateAndTimeDTO = new List<DateAndTimeDTO>();  
            foreach (var item in response)
            {
                dto.ProjectDTOs = _mapper.Map<ProjectDTO>(item.Projects);
                dto.ProjectTaskDTOs = _mapper.Map<ProjectTaskDTO>(item.ProjectTask);
                dto.WorkplaceDTOs = _mapper.Map<WorkplaceDTO>(item.Workplace);
                dto.ReasonDTOs = _mapper.Map<ReasonDTO>(item.Reason);
                DateAndTimeDTO dto2 = new()
                {
                    Dates = item.Dates,
                    Times = item.Times,
                    Description = item.TaskDescription,
                    isSubmitted = item.IsSubmitted,
                    CreatedBy = item.CreatedBy,
                };
                dateAndTimeDTO.Add(dto2);
            }
            dto.DateAndTimeDTOs = dateAndTimeDTO;   
            return Ok(dto);
        }


        [HttpGet("{dates}")]
        public async Task<IActionResult> Get(DateTime dates)
        {
            var response = _repository.Task.GetByDates(dates);
            return Ok(response);
        }

        // POST api/<TimesheetTrackerController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] List<TimesheetTrackerDTO> trackerData)
        {
            foreach (var tracker in trackerData)
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
                    IsSubmitted = tracker.IsSubmitted
                };

                await _repository.TimesheetTracker.Create(entity);
            }

            return Ok(trackerData);
        }

        // PUT api/<TimesheetTrackerController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] List<TimesheetTrackerDTO> trackerData)
        {
            foreach (var tracker in trackerData)
            {
                var entity = new TimesheetTracker
                {
                    Id = tracker.Id,
                    ProjectId = tracker.ProjectId,
                    TaskId = tracker.TaskId,
                    TaskDescription = tracker.TaskDescription,
                    ReasonId = tracker.ReasonId,
                    WorkplaceId = tracker.WorkplaceId,
                    Dates = tracker.Dates,
                    Times = tracker.Times,
                    CreatedBy = tracker.CreatedBy,
                    IsSubmitted = tracker.IsSubmitted
                };

                _repository.TimesheetTracker.Update(entity);
            }
            return Ok(trackerData);
        }

        // DELETE api/<TimesheetTrackerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
