namespace Idontknow.Domain.ViewModels.Service.Blog
{
    public class GetBlogsRequestViewModel : PaginatedSearchBaseOptionsViewModel
    {
        public string Url { get; set; }
        public int Rating { get; set; }
    }
}