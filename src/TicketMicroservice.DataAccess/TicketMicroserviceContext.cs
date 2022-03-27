using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketMicroservice.Core.Ticket;

namespace TicketMicroservice.DataAccess
{
    public class TicketMicroserviceContext : IdentityDbContext
    {
        public virtual DbSet<Ticket> Tickets { get; set; }

        public TicketMicroserviceContext(DbContextOptions<TicketMicroserviceContext> options) : base(options)
        {

        }
    }
}