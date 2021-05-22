export interface GeneralReport {
  summary: {income: number, expenses: number, total: number};
  incomeTransactions: {categoryName: string, total: number}[][],
  expenseTransactions: {categoryName: string, total: number}[][]
}
