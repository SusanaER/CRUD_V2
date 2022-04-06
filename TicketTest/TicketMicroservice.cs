using Newtonsoft.Json;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TicketMicroservice.Core.Ticket;

namespace TicketTest
{
    [TestFixture]
    public class TicketMicroservice
    {
        private WebFactory _factory;
        private HttpClient _client;
        private int ticketId;

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
            Ticket newTicket = new Ticket
            {
                JourneyId = 1,
                PassengerId = 1,
                Seat = 5
            };

            string json = JsonConvert.SerializeObject(newTicket);

            var buffer = System.Text.Encoding.UTF8.GetBytes(json);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PostAsync("/api/ticket", byteContent);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Order(1)]
        [Test]
        public async Task GetAllTestAsync()
        {
            var journeys = await _client.GetFromJsonAsync<List<Ticket>>("/api/ticket");

            var journeysAdded = journeys.FirstOrDefault(x => x.Id == 1);

            Assert.IsNotNull(journeysAdded);
            ticketId = journeysAdded.Id;

        }

        [Order(2)]
        [Test]
        public async Task GetByIdTestAsync()
        {
            var journeys = await _client.GetFromJsonAsync<Ticket>("/api/ticket" + ticketId);
            Assert.IsNotNull(journeys);
        }

        [Order(3)]
        [Test]
        public async Task UpdateTestAsync()
        {
            Ticket newTicket = new Ticket
            {
                JourneyId = 1,
                PassengerId = 1,
                Seat = 5
            };

            string json = JsonConvert.SerializeObject(newTicket);

            var buffer = System.Text.Encoding.UTF8.GetBytes(json);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PutAsync("/api/ticket/" + ticketId, byteContent);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Order(4)]
        [Test]
        public async Task DeleteTest()
        {
            var response = await _client.DeleteAsync("/api/ticket/" + ticketId);
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