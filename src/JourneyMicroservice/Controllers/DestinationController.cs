using JourneyMicroservice.ApplicationService.Destinations;
using JourneyMicroservice.Core.Destination;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JourneyMicroservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DestinationController : Controller
    {
        private readonly IDestinationAppService _destinationAppService;

        public DestinationController(IDestinationAppService destinationAppService)
        {
            _destinationAppService = destinationAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Destination> journey = await _destinationAppService.GetDestinationsAsync();
            return new JsonResult(journey);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var journey = await _destinationAppService.GetDestinationAsync(id);
            return new JsonResult(journey);
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Destination value)
        {
            var result = await _destinationAppService.AddDestinationAsync(value);
            return new JsonResult(result);
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Destination value)
        {
            var journey = await _destinationAppService.GetDestinationAsync(value.Id);

            if (journey == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _destinationAppService.EditDestinationAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var journey = await _destinationAppService.GetDestinationAsync(id);
            if (journey == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _destinationAppService.DeleteDestinationAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}
