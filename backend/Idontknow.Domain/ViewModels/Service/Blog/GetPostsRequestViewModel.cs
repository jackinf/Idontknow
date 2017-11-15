namespace Idontknow.Domain.ViewModels.Service.Blog
{
    public class GetPostsRequestViewModel : PaginatedSearchBaseOptionsViewModel
    {
        public int BlogId { get; set; }
    }
}