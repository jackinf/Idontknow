using System.Collections.Generic;
using Idontknow.DAL.Model;

namespace Idontknow.DAL.Domain.Repository
{
    public interface IBlogRepository
    {
        List<Blog> GetAll(int rating);

        void Add(string url);
    }
}