using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Idontknow.DAL
{
    public class UnitOfWork : IDisposable
    {
        private IDbContextTransaction _transaction;
        
        public ApplicationDbContext Context { get; private set; }

        public UnitOfWork()
        {
            Context = new ApplicationDbContext(new DbContextOptions<ApplicationDbContext>());
        }

        public void SaveChanges() => Context.SaveChanges();
        
        private bool _isDisposed;
        protected virtual void Dispose(bool isDisposing)
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
        
        public void BeginTransaction() => _transaction = Context.Database.BeginTransaction();
        public void Commit() => _transaction.Commit();
        public void Rollback() => _transaction.Rollback();
    }
}