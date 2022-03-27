using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketMicroservice.ApliccationServices.Tickets;
using TicketMicroservice.Core.Ticket;

namespace TicketMicroservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : Controller
    {
        private readonly ITicketAppService _ticketAppService;

        public TicketController(ITicketAppService ticketAppService)
        {
            _ticketAppService = ticketAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Ticket> ticket = await _ticketAppService.GetTicketsAsync();
            return new JsonResult(ticket);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var ticket = await _ticketAppService.GetTicketAsync(id);
            return new JsonResult(ticket);
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Ticket value)
        {
            var result = await _ticketAppService.AddTicketAsync(value);
            return new JsonResult(result);
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Ticket value)
        {
            var ticket = await _ticketAppService.GetTicketAsync(value.Id);

            if (ticket == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _ticketAppService.EditTicketAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var ticket = await _ticketAppService.GetTicketAsync(id);
            if (ticket == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _ticketAppService.DeleteTicketAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}