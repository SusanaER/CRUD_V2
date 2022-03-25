using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TicketMicroservice.Core.Ticket;
using TicketMicroservice.DataAccess.Repositories;

namespace TicketMicroservice.ApliccationServices.Tickets
{
    public class TicketAppService : ITicketAppService
    {
        private readonly IRepository<int, Ticket> _repository;

        public TicketAppService(IRepository<int, Ticket> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddTicketAsync(Ticket ticket)
        {
            HttpClient journey = new HttpClient();
            HttpResponseMessage responseJourney = await journey.GetAsync($"https://localhost:44393/Journey/{ticket.JourneyId}");
            responseJourney.EnsureSuccessStatusCode();

            string responseJourneyBody = await responseJourney.Content.ReadAsStringAsync();

            var journeyR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseJourneyBody);

            HttpClient passenger = new HttpClient();
            HttpResponseMessage responsePassenger = await passenger.GetAsync($"https://localhost:44310/Passenger/{ticket.PassengerId}");
            responsePassenger.EnsureSuccessStatusCode();

            string responsePassengerBody = await responsePassenger.Content.ReadAsStringAsync();

            var passengerR = Newtonsoft.Json.JsonConvert.DeserializeObject(responsePassengerBody);

            if (journeyR != null && passengerR != null)
            {
                await _repository.AddAsync(ticket);
                return ticket.Id;
            }
            else
            {
                return 0;
            }
        }

        public async Task DeleteTicketAsync(int ticketId)
        {
            await _repository.DeleteAsync(ticketId);
        }

        public async Task EditTicketAsync(Ticket ticket)
        {
            HttpClient journey = new HttpClient();
            HttpResponseMessage responseJourney = await journey.GetAsync($"https://localhost:44393/Journey/{ticket.JourneyId}");
            responseJourney.EnsureSuccessStatusCode();

            string responseJourneyBody = await responseJourney.Content.ReadAsStringAsync();

            var journeyR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseJourneyBody);

            HttpClient passenger = new HttpClient();
            HttpResponseMessage responsePassenger = await passenger.GetAsync($"https://localhost:44310/Passenger/{ticket.PassengerId}");
            responsePassenger.EnsureSuccessStatusCode();

            string responsePassengerBody = await responsePassenger.Content.ReadAsStringAsync();

            var passengerR = Newtonsoft.Json.JsonConvert.DeserializeObject(responsePassengerBody);

            if (journeyR != null && passengerR != null)
            {
                await _repository.UpdateAsync(ticket);
            }
        }

        public async Task<Ticket> GetTicketAsync(int ticketId)
        {
            return await _repository.GetAsync(ticketId);
        }

        public async Task<List<Ticket>> GetTicketsAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
