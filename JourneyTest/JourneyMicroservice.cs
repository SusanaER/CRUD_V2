using JourneyMicroservice.Core.Journey;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace JourneyTest
{
    [TestFixture]
    public class JourneyMicroservice
    {
        private WebFactory _factory;
        private HttpClient _client;
        private int journeyId;

        [OneTimeSetUp]
        public void Setup()
        {
            _factory = new WebFactory();
            _client = _factory.CreateClient();
        }

        [Order(0)]
        [Test]
        public async Task InsertTestAsync()
        {
            Journey newJourney = new Journey
            {
                DestinationId = 1,
                OriginId = 1,
                Departure = DateTime.Now,
                Arrival = DateTime.Now,
            };

            string json = JsonConvert.SerializeObject(newJourney);

            var buffer = System.Text.Encoding.UTF8.GetBytes(json);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PostAsync("/api/journey", byteContent);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Order(1)]
        [Test]
        public async Task GetAllTestAsync()
        {
            var journeys = await _client.GetFromJsonAsync<List<Journey>>("/api/journey");

            var journeysAdded = journeys.FirstOrDefault(x => x.Id == 1);

            Assert.IsNotNull(journeysAdded);
            journeyId = journeysAdded.Id;

        }

        [Order(2)]
        [Test]
        public async Task GetByIdTestAsync()
        {
            var journeys = await _client.GetFromJsonAsync<Journey>("/api/journey" + journeyId);
            Assert.IsNotNull(journeys);
        }

        [Order(3)]
        [Test]
        public async Task UpdateTestAsync()
        {
            Journey newJourney = new Journey
            {
                DestinationId = 1,
                OriginId = 1,
                Departure = DateTime.Now,
                Arrival = DateTime.Now,
            };

            string json = JsonConvert.SerializeObject(newJourney);

            var buffer = System.Text.Encoding.UTF8.GetBytes(json);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PutAsync("/api/journey/" + journeyId, byteContent);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Order(4)]
        [Test]
        public async Task DeleteTest()
        {
            var response = await _client.DeleteAsync("/api/journey/" + journeyId);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _client.Dispose();
            _factory.Dispose();
        }
    }
}