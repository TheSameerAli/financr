using System;
using WebApi.Utilities;
using Xunit;

namespace Tests.Unit
{
    public class RecurringTransactionsNextDateTests
    {
        [Fact]
        public void It_should_get_the_first_transaction_period_if_the_recurring_transaction_is_added_today()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, DateTimeOffset.Now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(7), nextDate);
            #endregion
        }
        
        [Fact]
        public void It_should_be_able_to_calculate_the_first_term_of_the_transaction()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act

            var now = DateTimeOffset.Now.AddDays(1);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(7), nextDate);
            #endregion
        }

        [Fact]
        public void It_should_be_able_to_calculate_the_second_term_of_the_transaction()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act

            var now = DateTimeOffset.Now.AddDays(8);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(14), nextDate);
            #endregion
        }

        [Fact]
        public void It_should_return_todays_date_if_the_transaction_is_due_today_for_first_term()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act
            var now = DateTimeOffset.Now.AddDays(7);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(7), nextDate);
            #endregion
        }

        [Fact]
        public void It_should_be_able_to_calculate_the_third_term_of_the_transaction()
        {
            #region Arrange

            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act

            var now = DateTimeOffset.Now.AddDays(15);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(21), nextDate);
            #endregion
        }
        
        [Fact]
        public void It_should_return_todays_date_if_the_transaction_is_due_today_for_second_term()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act

            var now = DateTimeOffset.Now.AddDays(14);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(14), nextDate);
            #endregion
        }

        [Fact]
        public void It_should_be_able_to_calculate_the_seventh_term_of_the_transaction()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 7;
            #endregion


            #region Act

            var now = DateTimeOffset.Now.AddDays(43);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(49), nextDate);
            #endregion
        }
        
        
        [Fact]
        public void It_should_be_able_to_calculate_the_thirteenth_term_of_the_transaction()
        {
            #region Arrange
            var startDate = DateTimeOffset.Now;
            var occurrence = 2;
            #endregion


            #region Act

            var now = DateTimeOffset.Now.AddDays(25);
            var nextDate = RecurringTransactions.NextDate(startDate, occurrence, now);
            #endregion


            #region Assert
            Assert.Equal(startDate.AddDays(26), nextDate);
            #endregion
        }
    }
}