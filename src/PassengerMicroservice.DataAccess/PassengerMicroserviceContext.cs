using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PassengerMicroservice.Core.Passenger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassengerMicroservice.DataAccess
{
    public class PassengerMicroserviceContext : IdentityDbContext
    {
        public virtual DbSet<Passenger> Passengers { get; set; }

        public PassengerMicroserviceContext(DbContextOptions<PassengerMicroserviceContext> options) : base(options)
        {

        }
    }
}

