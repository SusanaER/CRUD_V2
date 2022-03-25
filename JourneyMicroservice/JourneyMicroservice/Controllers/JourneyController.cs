using JourneyMicroservice.ApplicationService.Journeys;
using JourneyMicroservice.Core.Journey;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JourneyMicroservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JourneyController : Controller
    {
        private readonly IJourneyAppService _journeyAppServices;

        public JourneyController(IJourneyAppService journeyAppServices)
        {
            _journeyAppServices = journeyAppServices;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Journey> journey = await _journeyAppServices.GetJourneysAsync();
            return new JsonResult(journey);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var journey = await _journeyAppServices.GetJourneyAsync(id);
            return new JsonResult(journey);
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Journey value)
        {
            var result = await _journeyAppServices.AddJourneyAsync(value);
            return new JsonResult(result);
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Journey value)
        {
            var journey = await _journeyAppServices.GetJourneyAsync(value.Id);

            if (journey == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _journeyAppServices.EditJourneyAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var journey = await _journeyAppServices.GetJourneyAsync(id);
            if (journey == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _journeyAppServices.DeleteJourneyAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}
