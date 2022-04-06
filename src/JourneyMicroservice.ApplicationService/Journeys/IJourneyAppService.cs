using JourneyMicroservice.Core.Journey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.ApplicationService.Journeys
{
    public interface IJourneyAppService
    {
        Task<List<Journey>> GetJourneysAsync();

        Task<string> AddJourneyAsync(Journey journey);

        Task DeleteJourneyAsync(int journeyId);

        Task<Journey> GetJourneyAsync(int journeyId);

        Task EditJourneyAsync(Journey journey);
    }
}

