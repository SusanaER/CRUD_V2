using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketMicroservice.Core.Ticket;

namespace TicketTest
{
    public class WebFactory : WebApplicationFactory<Ticket>
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {

            builder.ConfigureServices(builder =>
            {

            });

            return base.CreateHost(builder);
        }
    }
}

