using System;

namespace WebApi.Utilities
{
    public static class RecurringTransactions
    {
        public static DateTimeOffset NextDate(DateTimeOffset startDate, int occurrence, DateTimeOffset dateToday = new DateTimeOffset())
        {
            var dateDeltaDays = (dateToday - startDate).Days;
            if (dateDeltaDays < 7)
            {
                return startDate.AddDays(occurrence);
            }

            if (dateDeltaDays % occurrence == 0)
            {
                return startDate.AddDays(occurrence * (dateDeltaDays / occurrence));
            }

            decimal deltaFactor = dateDeltaDays / occurrence;
            var occurrenceRequired = (int) Math.Floor(deltaFactor) + 1;

            return startDate.AddDays(occurrence * occurrenceRequired);
        }
    }
}