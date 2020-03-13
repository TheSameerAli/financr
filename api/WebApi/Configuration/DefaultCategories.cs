using System.Collections.Generic;

namespace WebApi.Configuration
{
    public static class DefaultCategories
    {
        public static List<string> IncomeCategories = new List<string>()
        {
            "Salary",
            "Gift",
            "Carry Over"
        };
        public static List<string> ExpenseCategories = new List<string>()
        {
            "Travel",
            "Eating Out",
            "Entertainment",
            "General",
            "Shopping",
            "Clothes",
            "Fuel",
            "Gifts",
            "Holidays",
            "Kids",
            "Sports"
        };
    }
}