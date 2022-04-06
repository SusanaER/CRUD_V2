using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using PassengerMicroservice.Core.Passenger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NUnitTest
{
    public class WebFactory : WebApplicationFactory<Passenger>
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

