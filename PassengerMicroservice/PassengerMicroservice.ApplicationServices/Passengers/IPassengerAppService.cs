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

        Task<int> AddPassengerAsync(Passenger sale);

        Task DeletePassengerAsync(int saleId);

        Task<Passenger> GetPassengerAsync(int saleId);

        Task EditPassengerAsync(Passenger sale);
    }
}
