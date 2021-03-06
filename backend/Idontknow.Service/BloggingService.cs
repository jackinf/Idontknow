﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.Domain.Factory;
using Idontknow.Domain.Repository;
using Idontknow.Domain.Service;
using Idontknow.Domain.UnitOfWork;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.Service
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class BloggingService : IBloggingService
    {
        private readonly IBloggingUnitOfWork _unitOfWork;

        public BloggingService(IBloggingUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        //
        // Blogs
        
        public async Task<ServiceResult<List<GetBlogsResponseViewModel>>> GetBlogs(GetBlogsRequestViewModel viewModel)
        {
            var paginatedListResult = await _unitOfWork.BlogRepository.GetBlogs(viewModel);
            return ServiceResultFactory.SuccessWithPaginator(paginatedListResult);
        }

        public async Task<ServiceResult<int>> CreateBlog(AddBlogRequestViewModel viewModel)
        {
            await _unitOfWork.BeginTransaction();
            var newBlogId = await _unitOfWork.BlogRepository.AddBlog(viewModel);
            await _unitOfWork.SaveChangesAsync();
            _unitOfWork.CommitTransaction();
            return ServiceResultFactory.Success(newBlogId);
        }
        
        public async Task<ServiceResult<bool>> UpdateBlog(int blogId, UpdateBlogRequestViewModel viewModel)
        {
            await _unitOfWork.BlogRepository.UpdateBlog(blogId, viewModel);
            return ServiceResultFactory.Success(true);
        }

        public async Task<ServiceResult<bool>> DeleteBlog(int blogId)
        {
            await _unitOfWork.BlogRepository.DeleteBlog(blogId);
            return ServiceResultFactory.Success(true);
        }

        //
        // Posts
        
        public async Task<ServiceResult<List<GetPostsResultViewModel>>> GetPosts(int blogId, GetPostsRequestViewModel viewModel)
        {
            var posts = await _unitOfWork.PostRepository.GetPosts(blogId, viewModel);
            return ServiceResultFactory.SuccessWithPaginator(posts);
        }

        public async Task<ServiceResult<bool>> CreatePost(int blogId, AddPostRequestViewModel viewModel)
        {
            await _unitOfWork.PostRepository.AddPost(blogId, viewModel);
            return ServiceResultFactory.Success(true);
        }
    }
}