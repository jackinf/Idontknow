using System.Collections.Generic;
using System.Linq;
using Idontknow.Domain.Extension;

namespace Idontknow.Domain.ViewModels.Result
{
    public class PaginatedListResult<TModel>
    {
        public List<TModel> ContextObjects { get; set; }
        public int TotalCount { get; set; }
        public int Pages { get; set; } = 1;

        public PaginatedListResult<TModel> Concat(PaginatedListResult<TModel> pendingAssignments, int sizePerPage)
        {
            var concatenatedContextObjects = ContextObjects.Concat(pendingAssignments.ContextObjects).ToList();
            var totalCount = concatenatedContextObjects.Count;
            return new PaginatedListResult<TModel>
            {
                ContextObjects = concatenatedContextObjects,
                TotalCount = totalCount,
                Pages = QueryableExtensions.CalculateResultPages(totalCount, sizePerPage)
            };
        }
    }
}