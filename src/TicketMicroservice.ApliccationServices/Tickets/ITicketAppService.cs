using TicketMicroservice.Core.Ticket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketMicroservice.ApliccationServices.Tickets
{
    public interface ITicketAppService
    {
        Task<List<Ticket>> GetTicketsAsync();

        Task<string> AddTicketAsync(Ticket ticket);

        Task DeleteTicketAsync(int ticketId);

        Task<Ticket> GetTicketAsync(int ticketId);

        Task EditTicketAsync(Ticket ticket);
    }
}