using JourneyMicroservice.Core.Journey;
using JourneyMicroservice.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.ApplicationService.Journeys
{
    public class JourneyAppService : IJourneyAppService
    {
        private readonly IRepository<int, Journey> _repository;

        public JourneyAppService(IRepository<int, Journey> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddJourneyAsync(Journey journey)
        {
            HttpClient destination = new HttpClient();
            HttpResponseMessage responseDestination = await destination.GetAsync($"https://localhost:44393/Destination/{journey.DestinationId}");
            responseDestination.EnsureSuccessStatusCode();

            string responseDestinationBody = await responseDestination.Content.ReadAsStringAsync();

            var destinationR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseDestinationBody);

            HttpClient origin = new HttpClient();
            HttpResponseMessage responseOrigin = await origin.GetAsync($"https://localhost:44393/Destination/{journey.OriginId}");
            responseOrigin.EnsureSuccessStatusCode();

            string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

            var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);

            if (destinationR != null && originR != null)
            {
                await _repository.AddAsync(journey);
                return journey.Id;
            }
            else
            {
                return 0;
            }
        }

        public async Task DeleteJourneyAsync(int journeyId)
        {
            await _repository.DeleteAsync(journeyId);
        }

        public async Task EditJourneyAsync(Journey journey)
        {
            HttpClient destination = new HttpClient();
            HttpResponseMessage responseDestination = await destination.GetAsync($"https://localhost:44393/Destination/{journey.DestinationId}");
            responseDestination.EnsureSuccessStatusCode();

            string responseDestinationBody = await responseDestination.Content.ReadAsStringAsync();

            var destinationR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseDestinationBody);

            HttpClient origin = new HttpClient();
            HttpResponseMessage responseOrigin = await origin.GetAsync($"https://localhost:44393/Destination/{journey.OriginId}");
            responseOrigin.EnsureSuccessStatusCode();

            string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

            var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);

            if (destinationR != null && originR != null)
            {
                await _repository.UpdateAsync(journey);
            }
        }

        public async Task<Journey> GetJourneyAsync(int journeyId)
        {
            return await _repository.GetAsync(journeyId);
        }

        public async Task<List<Journey>> GetJourneysAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
