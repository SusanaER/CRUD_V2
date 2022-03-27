using JourneyMicroservice.Core.Destination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.ApplicationService.Destinations
{
    public interface IDestinationAppService
    {
        Task<List<Destination>> GetDestinationsAsync();

        Task<int> AddDestinationAsync(Destination destination);

        Task DeleteDestinationAsync(int destinationId);

        Task<Destination> GetDestinationAsync(int destinationId);

        Task EditDestinationAsync(Destination destination);
    }
}

