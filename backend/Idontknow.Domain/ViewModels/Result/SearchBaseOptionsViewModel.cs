using Idontknow.Domain.Constant;

namespace Idontknow.Domain.ViewModels.Result
{
    public class SearchBaseOptionsViewModel : PaginatedSearchBaseOptionsViewModel
    {
        private string _sortOrder = BaseConstants.OrderOptions_ASC;

        /// <summary>
        /// Value to sort by
        /// </summary>
        public string SortName { get; set; } = null;

        /// <summary>
        /// In which order is sorted the SortName. Accepts from frontend 'asc' or 'desc'
        /// </summary>
        public string SortOrder
        {
            get { return _sortOrder; }
            set { _sortOrder = value == BaseConstants.OrderOptions_DESC ? BaseConstants.OrderOptions_DESC : BaseConstants.OrderOptions_ASC; }
        }

        public bool IsSortAscending() => SortOrder == BaseConstants.OrderOptions_ASC;
        public bool IsSortDescending() => SortOrder == BaseConstants.OrderOptions_DESC;
    }
}