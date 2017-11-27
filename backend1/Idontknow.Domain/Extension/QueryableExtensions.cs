using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Idontknow.Domain.Constant;
using Idontknow.Domain.ViewModels;
using Idontknow.Domain.ViewModels.Result;
using Microsoft.EntityFrameworkCore;

namespace Idontknow.Domain.Extension
{
    public static class QueryableExtensions
    {
        public static async Task<PaginatedListResult<TModel>> ToPaginatedListResultAsync<TModel>(this IQueryable<TModel> query, PaginatedSearchBaseOptionsViewModel options)
        {
            // TODO: Make this more understandable for developers

            // Important! Get count before skip and take.
            var totalCount = query.Count();
            var pages = CalculateResultPages(totalCount, options.SizePerPage);

            if (totalCount <= options.Skip)
                options.Page = totalCount / options.SizePerPage; 

            if (query.Expression.Type == typeof(IOrderedQueryable<TModel>))
                query = query.Skip(options.Skip).Take(options.Take);

            var result = new PaginatedListResult<TModel>
            {
                ContextObjects = await query.ToListAsync(),
                TotalCount = totalCount,
                Pages = pages
            };
            return result;
        }

        public static async Task<PaginatedListResult<TViewModel>> ToPaginatedListResultForViewModelAsync<TViewModel>(this IQueryable<TViewModel> query, PaginatedSearchBaseOptionsViewModel options)
        {
            var totalCount = await query.CountAsync();
            var pages = CalculateResultPages(totalCount, options.SizePerPage);
            
            if (totalCount <= options.Skip)
                options.Page = totalCount / options.SizePerPage; 
            
            query = query
                .Skip(options.Skip)
                .Take(options.Take);

            var result = new PaginatedListResult<TViewModel>
            {
                ContextObjects = await query.ToListAsync(),
                TotalCount = totalCount,
                Pages = pages
            };
            return result;
        }

        public static IQueryable<T> Sort<T>(this IQueryable<T> query, Expression<Func<T, string>> sortExpression, string sortDirection = null)
        {
            return sortDirection == BaseConstants.OrderOptions_ASC
                ? query.OrderBy(sortExpression)
                : sortDirection == BaseConstants.OrderOptions_DESC
                    ? query.OrderByDescending(sortExpression)
                    : query;
        }

        public static int CalculateResultPages(int totalCount, int sizePerPage)
        {
            var pages = 1;
            if (totalCount <= 0) 
                return pages;
            var pageCount = (float)totalCount / sizePerPage;
            pages = (int)Math.Ceiling(pageCount);
            return pages;
        }
    }
}