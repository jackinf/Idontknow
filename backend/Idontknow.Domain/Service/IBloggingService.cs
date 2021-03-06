﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.Domain.Service
{
    public interface IBloggingService
    {
        //
        // Blogs
        
        Task<ServiceResult<int>> CreateBlog(AddBlogRequestViewModel viewModel);

        Task<ServiceResult<List<GetBlogsResponseViewModel>>> GetBlogs(GetBlogsRequestViewModel viewModel);

        Task<ServiceResult<bool>> UpdateBlog(int blogId, UpdateBlogRequestViewModel viewModel);

        Task<ServiceResult<bool>> DeleteBlog(int blogId);
        
        //
        // Posts
        
        Task<ServiceResult<List<GetPostsResultViewModel>>> GetPosts(int blogId, GetPostsRequestViewModel viewModel);
        
        Task<ServiceResult<bool>> CreatePost(int blogId, AddPostRequestViewModel viewModel);
    }
}