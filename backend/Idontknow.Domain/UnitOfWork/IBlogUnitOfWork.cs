using Idontknow.Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace Idontknow.Domain.UnitOfWork
{
    public interface IBloggingUnitOfWork : IBaseUnitOfWork
    {        
        IBlogRepository BlogRepository { get; }
        
        IPostRepository PostRepository { get; }
    }
}