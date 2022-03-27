using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JourneyMicroservice.DataAccess.Repositories
{
    public interface IRepository<Tid, TEntity> where TEntity : class, new()
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetAsync(Tid id);

        Task<TEntity> AddAsync(TEntity entity);

        Task<TEntity> UpdateAsync(TEntity entity);

        Task DeleteAsync(Tid id);
    }
}
