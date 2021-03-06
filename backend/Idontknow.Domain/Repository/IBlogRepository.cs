﻿using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.Domain.Repository
{
    public interface IBlogRepository
    {
        Task<PaginatedListResult<GetBlogsResponseViewModel>> GetBlogs(GetBlogsRequestViewModel viewModel);
        
        Task<int> AddBlog(AddBlogRequestViewModel viewModel);

        Task UpdateBlog(int blogId, UpdateBlogRequestViewModel viewModel);
        
        Task DeleteBlog(int blogId);
    }
}