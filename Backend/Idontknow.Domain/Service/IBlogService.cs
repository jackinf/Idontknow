﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.Domain.Service
{
    public interface IBlogService
    {
        //
        // Blogs
        
        Task<ServiceResult<bool>> CreateBlog(AddBlogRequestViewModel viewModel);

        Task<ServiceResult<List<GetBlogsResponseViewModel>>> GetBlogs(GetBlogsRequestViewModel viewModel);

        //
        // Posts
        
        Task<ServiceResult<List<GetPostsResultViewModel>>> GetPosts(GetPostsRequestViewModel viewModel);
        
        Task<ServiceResult<bool>> CreatePost(AddPostRequestViewModel viewModel);
    }
}