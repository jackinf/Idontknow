using Idontknow.DAL.Repository;
using Idontknow.Domain.Repository;
using Idontknow.Domain.UnitOfWork;

namespace Idontknow.DAL.UnitOfWork
{
    public class BloggingUnitOfWork : BaseUnitOfWork, IBloggingUnitOfWork
    {
        public BloggingUnitOfWork(ApplicationDbContext context) : base(context)
        {
            BlogRepository = new BlogRepository(context);
            PostRepository = new PostRepository(context);
        }

        public IBlogRepository BlogRepository { get; }
        public IPostRepository PostRepository { get; }
    }
}