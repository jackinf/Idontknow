namespace Idontknow.Domain.ViewModels
{
    public class PaginatedSearchBaseOptionsViewModel
    {
        private const int MinimumPage = 1; // below which number cannot the page number be
        private const int DefaultPage = 1; // what is the default page if the specified page number is invalid (below allowed minimum)
        private const int MinimumSizePerPage = 1; // same for minimum page
        private const int DefaultSizePerPage = 25; // same for default page

        private int _page = DefaultPage;
        private int _sizePerPage = DefaultSizePerPage;

        /// <summary>
        /// Number of the current page. Starts with 1
        /// </summary>
        public int Page
        {
            get => _page;
            set => _page = value >= MinimumPage ? value : DefaultPage;
        }

        /// <summary>
        /// Size of the page
        /// </summary>
        public int SizePerPage
        {
            get => _sizePerPage;
            set => _sizePerPage = value >= MinimumSizePerPage ? value : DefaultSizePerPage;
        }

        //////////////////
        // HELPERS
        //////////////////

        public int Skip => (Page - 1) * SizePerPage;
        public virtual int Take => SizePerPage;
    }
}