using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketMicroservice.Core.Ticket;

namespace TicketMicroservice.DataAccess.Repositories
{
    public class TicketRepository : Repository<int, Ticket>
    {
        public TicketRepository(TicketMicroserviceContext context) : base(context)
        {

        }

        public override async Task<Ticket> AddAsync(Ticket entity)
        {
            await Context.Tickets.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Ticket> UpdateAsync(Ticket entity)
        {
            var ticket = await Context.Tickets.FindAsync(entity.Id);
            ticket.JourneyId = entity.JourneyId;
            ticket.PassengerId = entity.PassengerId;
            ticket.Seat = entity.Seat;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Ticket> GetAsync(int id)
        {
            var ticket = await Context.Tickets.FirstOrDefaultAsync(x => x.Id == id);
            return ticket;
        }
    }
}