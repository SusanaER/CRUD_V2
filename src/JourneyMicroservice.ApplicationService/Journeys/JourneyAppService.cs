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

        public async Task<string> AddJourneyAsync(Journey journey)
        {
            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                HttpClient destination = new HttpClient(clientHandler);
                HttpResponseMessage responseDestination = await destination.GetAsync($"https://host.docker.internal:773/Destination/{journey.DestinationId}");
                responseDestination.EnsureSuccessStatusCode();

                string responseDestinationBody = await responseDestination.Content.ReadAsStringAsync();

                var destinationR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseDestinationBody);


                HttpClient origin = new HttpClient(clientHandler);
                HttpResponseMessage responseOrigin = await origin.GetAsync($"https://host.docker.internal:773/Destination/{journey.OriginId}");
                responseOrigin.EnsureSuccessStatusCode();

                string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

                var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);

                if (destinationR != null && originR != null)
                {
                    await _repository.AddAsync(journey);
                    return "Successfully added";
                }
                else
                {
                    return "Error, origin or destination not exist";
                }
            }
            catch (Exception e)
            {
                return "Exception caught. " + e;
            }

        }

        public async Task DeleteJourneyAsync(int journeyId)
        {
            await _repository.DeleteAsync(journeyId);
        }

        public async Task EditJourneyAsync(Journey journey)
        {
            HttpClient destination = new HttpClient();
            HttpResponseMessage responseDestination = await destination.GetAsync($"https://host.docker.internal:773/{journey.DestinationId}");
            responseDestination.EnsureSuccessStatusCode();

            string responseDestinationBody = await responseDestination.Content.ReadAsStringAsync();

            var destinationR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseDestinationBody);

            HttpClient origin = new HttpClient();
            HttpResponseMessage responseOrigin = await origin.GetAsync($"https://host.docker.internal:773/{journey.OriginId}");
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
