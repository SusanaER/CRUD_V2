using JourneyMicroservice.Core.Destination;
using JourneyMicroservice.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.ApplicationService.Destinations
{
    public class DestinationAppService : IDestinationAppService
    {
        private readonly IRepository<int, Destination> _repository;

        public DestinationAppService(IRepository<int, Destination> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddDestinationAsync(Destination destination)
        {
            await _repository.AddAsync(destination);
            return destination.Id;
        }

        public async Task DeleteDestinationAsync(int destinationId)
        {
            await _repository.DeleteAsync(destinationId);
        }

        public async Task EditDestinationAsync(Destination destination)
        {
            await _repository.UpdateAsync(destination);
        }

        public async Task<Destination> GetDestinationAsync(int destinationId)
        {
            return await _repository.GetAsync(destinationId);
        }

        public async Task<List<Destination>> GetDestinationsAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
