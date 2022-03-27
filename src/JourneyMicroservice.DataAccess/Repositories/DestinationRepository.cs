using JourneyMicroservice.Core.Destination;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.DataAccess.Repositories
{
    public class DestinationRepository : Repository<int, Destination>
    {
        public DestinationRepository(JourneyMicroserviceContext context) : base(context)
        {

        }

        public override async Task<Destination> AddAsync(Destination entity)
        {
            await Context.Destinations.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Destination> UpdateAsync(Destination entity)
        {
            var destination = await Context.Destinations.FindAsync(entity.Id);
            destination.Id = entity.Id;
            destination.Name = entity.Name;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Destination> GetAsync(int id)
        {
            var destination = await Context.Destinations.FirstOrDefaultAsync(x => x.Id == id);
            return destination;
        }
    }
}
