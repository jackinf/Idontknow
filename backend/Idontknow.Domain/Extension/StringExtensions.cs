using System;

namespace Idontknow.Domain.Extension
{
    public static class StringExtensions
    {
        public static T ParseEnum<T>(this string value) where T : new()
        {
            if (value != null)
            {
                return (T)Enum.Parse(typeof(T), value, true);
            }
            return new T();
        }

        public static bool IsNullOrEmpty(this string input)
        {
            return input == null || input.Length < 1 || input.Trim().Length < 1;
        }
    }
}
