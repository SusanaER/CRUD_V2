using JourneyMicroservice.Core.Destination;
using JourneyMicroservice.Core.Journey;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.DataAccess
{
    public class JourneyMicroserviceContext : IdentityDbContext
    {
        public virtual DbSet<Journey> Journeys { get; set; }

        public virtual DbSet<Destination> Destinations { get; set; }

        public JourneyMicroserviceContext(DbContextOptions<JourneyMicroserviceContext> options) : base(options)
        {

        }
    }
}