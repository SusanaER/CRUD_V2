using JourneyMicroservice.ApplicationService.Destinations;
using JourneyMicroservice.ApplicationService.Journeys;
using JourneyMicroservice.Core.Destination;
using JourneyMicroservice.Core.Journey;
using JourneyMicroservice.DataAccess;
using JourneyMicroservice.DataAccess.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JourneyMicroservice
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("Default");

            //throw new Exception(connectionString);

            services.AddDbContext<JourneyMicroserviceContext>(options =>
                options.UseInMemoryDatabase(databaseName: "journeyMicroservice"));

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                                      .AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                                  });
            });

            services.AddTransient<IJourneyAppService, JourneyAppService>();
            services.AddTransient<IDestinationAppService, DestinationAppService>();
            services.AddTransient<IRepository<int, Journey>, JourneyRepository>();
            services.AddTransient<IRepository<int, Destination>, DestinationRepository>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "JourneyMicroservice", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "JourneyMicroservice v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
