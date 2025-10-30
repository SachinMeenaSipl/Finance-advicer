import { Income, Expenses } from '@/types'
import { formatZAR, calculateNetSurplus } from '@/lib/calculations'
import { useEffect, useState } from 'react'

interface IncomeExpensesStepProps {
  income: Income
  expenses: Expenses
  onIncomeChange: (data: Income) => void
  onExpensesChange: (data: Expenses) => void
}

export default function IncomeExpensesStep({
  income,
  expenses,
  onIncomeChange,
  onExpensesChange,
}: IncomeExpensesStepProps) {
  const [netSurplus, setNetSurplus] = useState(0)

  useEffect(() => {
    const totalIncome = (income.salary || 0) + (income.bonus || 0) + (income.other || 0)
    const totalExpenses = 
      (expenses.rent || 0) + 
      (expenses.groceries || 0) + 
      (expenses.insurance || 0) + 
      (expenses.transport || 0) + 
      (expenses.utilities || 0) + 
      (expenses.entertainment || 0) + 
      (expenses.other || 0)
    
    onIncomeChange({ ...income, totalMonthly: totalIncome })
    onExpensesChange({ ...expenses, totalMonthly: totalExpenses })
    setNetSurplus(calculateNetSurplus(totalIncome, totalExpenses))
  }, [income.salary, income.bonus, income.other, expenses.rent, expenses.groceries, expenses.insurance, expenses.transport, expenses.utilities, expenses.entertainment, expenses.other])

  const handleIncomeChange = (field: keyof Income, value: number) => {
    onIncomeChange({ ...income, [field]: value })
  }

  const handleExpensesChange = (field: keyof Expenses, value: number) => {
    onExpensesChange({ ...expenses, [field]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Income & Expenses
      </h2>

      {/* Income Section */}
      <div className="p-6 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
          Monthly Income
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Salary
            </label>
            <input
              type="number"
              value={income.salary || ''}
              onChange={(e) => handleIncomeChange('salary', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bonus
            </label>
            <input
              type="number"
              value={income.bonus || ''}
              onChange={(e) => handleIncomeChange('bonus', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Other Income
            </label>
            <input
              type="number"
              value={income.other || ''}
              onChange={(e) => handleIncomeChange('other', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Monthly Income: </span>
          <span className="text-lg font-bold text-green-700 dark:text-green-400">
            {formatZAR(income.totalMonthly || 0)}
          </span>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="p-6 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4">
          Monthly Expenses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rent/Bond
            </label>
            <input
              type="number"
              value={expenses.rent || ''}
              onChange={(e) => handleExpensesChange('rent', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Groceries
            </label>
            <input
              type="number"
              value={expenses.groceries || ''}
              onChange={(e) => handleExpensesChange('groceries', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Medical Aid/Insurance
            </label>
            <input
              type="number"
              value={expenses.insurance || ''}
              onChange={(e) => handleExpensesChange('insurance', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transport
            </label>
            <input
              type="number"
              value={expenses.transport || ''}
              onChange={(e) => handleExpensesChange('transport', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Utilities
            </label>
            <input
              type="number"
              value={expenses.utilities || ''}
              onChange={(e) => handleExpensesChange('utilities', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Entertainment
            </label>
            <input
              type="number"
              value={expenses.entertainment || ''}
              onChange={(e) => handleExpensesChange('entertainment', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Other Expenses
            </label>
            <input
              type="number"
              value={expenses.other || ''}
              onChange={(e) => handleExpensesChange('other', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Monthly Expenses: </span>
          <span className="text-lg font-bold text-red-700 dark:text-red-400">
            {formatZAR(expenses.totalMonthly || 0)}
          </span>
        </div>
      </div>

      {/* Net Surplus */}
      <div className={`p-6 rounded-lg ${netSurplus >= 0 ? 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20' : 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Net Monthly Surplus
            </h3>
            {netSurplus < 0 && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                ⚠️ Warning: Expenses exceed income. Client needs to reduce expenses or increase income.
              </p>
            )}
          </div>
          <div className={`text-3xl font-bold ${netSurplus >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {formatZAR(netSurplus)}
          </div>
        </div>
      </div>
    </div>
  )
}
