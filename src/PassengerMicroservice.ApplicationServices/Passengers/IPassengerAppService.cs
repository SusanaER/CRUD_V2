using PassengerMicroservice.Core.Passenger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PassengerMicroservice.ApplicationServices.Passengers
{
    public interface IPassengerAppService
    {
        Task<List<Passenger>> GetPassengersAsync();

        Task<int> AddPassengerAsync(Passenger passenger);

        Task DeletePassengerAsync(int passengerId);

        Task<Passenger> GetPassengerAsync(int passengerId);

        Task EditPassengerAsync(Passenger passenger);
    }
}
