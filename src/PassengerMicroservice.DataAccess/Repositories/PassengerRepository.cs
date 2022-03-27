using Microsoft.EntityFrameworkCore;
using PassengerMicroservice.Core.Passenger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassengerMicroservice.DataAccess.Repositories
{
    public class PassengerRepository : Repository<int, Passenger>
    {
        public PassengerRepository(PassengerMicroserviceContext context) : base(context)
        {

        }

        public override async Task<Passenger> AddAsync(Passenger entity)
        {
            await Context.Passengers.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Passenger> UpdateAsync(Passenger entity)
        {
            var passenger = await Context.Passengers.FindAsync(entity.Id);
            passenger.FirstName = entity.FirstName;
            passenger.LastName = entity.LastName;
            passenger.Age = entity.Age;
            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Passenger> GetAsync(int id)
        {
            var passenger = await Context.Passengers.FirstOrDefaultAsync(x => x.Id == id);
            return passenger;
        }
    }
}
