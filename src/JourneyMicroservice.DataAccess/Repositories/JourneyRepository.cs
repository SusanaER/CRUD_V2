using JourneyMicroservice.Core.Journey;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.DataAccess.Repositories
{
    public class JourneyRepository : Repository<int, Journey>
    {
        public JourneyRepository(JourneyMicroserviceContext context) : base(context)
        {

        }

        public override async Task<Journey> AddAsync(Journey entity)
        {
            await Context.Journeys.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Journey> UpdateAsync(Journey entity)
        {
            var journey = await Context.Journeys.FindAsync(entity.Id);
            journey.DestinationId = entity.DestinationId;
            journey.OriginId = entity.OriginId;
            journey.Departure = entity.Departure;
            journey.Arrival = entity.Arrival;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Journey> GetAsync(int id)
        {
            var journey = await Context.Journeys.FirstOrDefaultAsync(x => x.Id == id);
            return journey;
        }
    }
}
