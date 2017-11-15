using System;

namespace Idontknow.Domain.Constant
{
    public enum Language
    {
        /// <summary>
        /// English
        /// </summary>
        en = 1,
        /// <summary>
        /// Finnish
        /// </summary>
        fi = 2,
        /// <summary>
        /// Swedish
        /// </summary>
        sv= 3
    }

    public static class BaseConstants
    {
        public const string OrderOptions_ASC = "asc";
        public const string OrderOptions_DESC = "desc";

        /// <summary>
        /// Returns timestamp for the archived item in order if we want to change unique name.
        /// E.g. This is needed for the user-s Username: when we archive the user, we need to make the username available again.
        /// We make it available by adding suffix to the arvhied user.
        /// </summary>
        /// <returns></returns>
        public static string GetArchivedSuffixString() => $"_ARCHIEVED_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
    }

    public static class FrontendConstants
    {
        public const string JavaScriptNull = "null";
    }
}
