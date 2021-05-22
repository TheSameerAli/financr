using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace WebApi.Models.Domain.Reports
{
    public class GeneralReport
    {
        public GeneralReportSummary Summary { get; set; }
        
        public IEnumerable<IGrouping<string, GeneralReportTransaction>> IncomeTransactions { get; set; }
        public IEnumerable<IGrouping<string, GeneralReportTransaction>> ExpenseTransactions { get; set; }

        public GeneralReport(GeneralReportSummary summary, IEnumerable<IGrouping<string, GeneralReportTransaction>> incomeTransactions,
            IEnumerable<IGrouping<string, GeneralReportTransaction>> expenseTransactions)
        {
            Summary = summary;
            IncomeTransactions = incomeTransactions;
            ExpenseTransactions = expenseTransactions;

        }
    }

    public class GeneralReportSummary
    {
        public double Income { get; set; }
        public double Expenses { get; set; }
        public double Total => Income - (Expenses * -1);

        public GeneralReportSummary(double income, double expenses)
        {
            Income = income;
            Expenses = expenses;
        }
    }

    public class GeneralReportTransaction
    {
        public string CategoryName { get; set; }
        public double Total { get; set; }

        public GeneralReportTransaction(string categoryName, double total)
        {
            CategoryName = categoryName;
            Total = total;
        }
    }
}