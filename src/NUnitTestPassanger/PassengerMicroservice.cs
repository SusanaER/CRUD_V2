using Newtonsoft.Json;
using NUnit.Framework;
using PassengerMicroservice.Core.Passenger;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace NUnitTest
{
    [TestFixture]
    public class PassengerMicroservices
    {
        private WebFactory _factory;
        private HttpClient _client;
        private int passengerId;

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
            Passenger newPassenger = new Passenger
            {
                FirstName = "TestPassenger",
                LastName = "LastName",
                Age = 2
            };

            string json = JsonConvert.SerializeObject(newPassenger);

            var buffer = System.Text.Encoding.UTF8.GetBytes(json);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PostAsync("/api/passenger", byteContent);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Order(1)]
        [Test]
        public async Task GetAllTestAsync()
        {
            var passengers = await _client.GetFromJsonAsync<List<Passenger>>("/api/passenger");

            var passengerAdded = passengers.FirstOrDefault(x => x.Id == 1);

            Assert.IsNotNull(passengerAdded);
            passengerId = passengerAdded.Id;

        }

        [Order(2)]
        [Test]
        public async Task GetByIdTestAsync()
        {
            var passenger = await _client.GetFromJsonAsync<Passenger>("/api/passenger" + passengerId);
            Assert.IsNotNull(passenger);
        }

        [Order(3)]
        [Test]
        public async Task UpdateTestAsync()
        {
            Passenger newPassenger = new Passenger
            {
                FirstName = "TestPassenger",
                LastName = "LastName",
                Age = 2
            };

            string json = JsonConvert.SerializeObject(newPassenger);

            var buffer = System.Text.Encoding.UTF8.GetBytes(json);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PutAsync("/api/passenger/" + passengerId, byteContent);
            string resultContent = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Order(4)]
        [Test]
        public async Task DeleteTest()
        {
            var response = await _client.DeleteAsync("/api/passenger/" + passengerId);
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