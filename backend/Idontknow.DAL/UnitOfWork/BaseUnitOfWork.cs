using System;
using System.Threading.Tasks;
using Idontknow.Domain.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Idontknow.DAL.UnitOfWork
{
    public abstract class BaseUnitOfWork : IBaseUnitOfWork, IDisposable
    {
        private IDbContextTransaction _transaction;
        private bool _isDisposed;
        
        public DbContext Context { get; }

        protected BaseUnitOfWork(DbContext context)
        {
            Context = context;
        }
        
        public async Task<IDbContextTransaction> BeginTransaction() => _transaction = await Context.Database.BeginTransactionAsync();
        public void CommitTransaction() => _transaction.Commit();
        public void RollbackTransaction() => _transaction.Rollback();
        public async Task SaveChangesAsync() => await Context.SaveChangesAsync();
        
        private void Dispose(bool isDisposing)
        {
            if (!_isDisposed && isDisposing)
                Context.Dispose();
            _isDisposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}