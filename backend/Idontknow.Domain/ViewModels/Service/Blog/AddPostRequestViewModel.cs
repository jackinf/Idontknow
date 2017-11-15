namespace Idontknow.Domain.ViewModels.Service.Blog
{
    public class AddPostRequestViewModel : PaginatedSearchBaseOptionsViewModel
    {
        public string Title { get; set; }
        
        public string Content { get; set; }
        
        public int BlogId { get; set; }
    }
}