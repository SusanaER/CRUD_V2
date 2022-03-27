using Microsoft.AspNetCore.Mvc;
using PassengerMicroservice.ApplicationServices.Passengers;
using PassengerMicroservice.Core.Passenger;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PassengerMicroservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassengerController : Controller
    {
        private readonly IPassengerAppService _passengerAppServices;

        public PassengerController(IPassengerAppService passengerAppServices)
        {
            _passengerAppServices = passengerAppServices;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Passenger> passenger = await _passengerAppServices.GetPassengersAsync();
            return new JsonResult(passenger);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var passenger = await _passengerAppServices.GetPassengerAsync(id);
            return new JsonResult(passenger);
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Passenger value)
        {
            var result = await _passengerAppServices.AddPassengerAsync(value);
            return new JsonResult(result);
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Passenger value)
        {
            var passenger = await _passengerAppServices.GetPassengerAsync(value.Id);
            
            if (passenger == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _passengerAppServices.EditPassengerAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var passenger = await _passengerAppServices.GetPassengerAsync(id);
            if (passenger == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _passengerAppServices.DeletePassengerAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}
