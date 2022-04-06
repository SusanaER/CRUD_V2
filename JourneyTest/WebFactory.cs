using JourneyMicroservice.Core.Journey;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyTest
{
    public class WebFactory : WebApplicationFactory<Journey>
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
