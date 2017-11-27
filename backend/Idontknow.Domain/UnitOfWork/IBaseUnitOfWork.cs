using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Idontknow.Domain.UnitOfWork
{
    public interface IBaseUnitOfWork
    {
        DbContext Context { get; }

        Task<IDbContextTransaction> BeginTransaction();

        void CommitTransaction();

        void RollbackTransaction();

        Task SaveChangesAsync();
    }
}