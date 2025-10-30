import { Goal, GoalFeasibility, YearlyProjection } from '@/types'

/**
 * Format currency in South African Rand
 */
export function formatZAR(amount: number): string {
  return `R${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Calculate net monthly surplus
 */
export function calculateNetSurplus(income: number, expenses: number): number {
  return income - expenses
}

/**
 * Calculate net worth
 */
export function calculateNetWorth(assets: number, liabilities: number): number {
  return assets - liabilities
}

/**
 * Calculate future value of monthly contributions
 * FV = PMT × ((1 + r)^n - 1) / r
 * where:
 * - PMT = monthly contribution
 * - r = monthly growth rate
 * - n = total number of months
 */
export function calculateFutureValue(
  monthlyContribution: number,
  annualGrowthRate: number,
  years: number
): number {
  const monthlyRate = annualGrowthRate / 12 / 100
  const months = years * 12
  
  if (monthlyRate === 0) {
    return monthlyContribution * months
  }
  
  const futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  return futureValue
}

/**
 * Calculate required monthly contribution to reach target
 */
export function calculateRequiredContribution(
  targetAmount: number,
  annualGrowthRate: number,
  years: number
): number {
  const monthlyRate = annualGrowthRate / 12 / 100
  const months = years * 12
  
  if (monthlyRate === 0) {
    return targetAmount / months
  }
  
  const requiredContribution = targetAmount / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  return requiredContribution
}

/**
 * Calculate goal feasibility
 */
export function calculateGoalFeasibility(goal: Goal): GoalFeasibility {
  const futureValue = calculateFutureValue(
    goal.monthlyContribution,
    goal.growthRate,
    goal.timeHorizon
  )
  
  const isOnTrack = futureValue >= goal.targetAmount
  
  let requiredMonthlyContribution: number | undefined
  if (!isOnTrack) {
    requiredMonthlyContribution = calculateRequiredContribution(
      goal.targetAmount,
      goal.growthRate,
      goal.timeHorizon
    )
  }
  
  // Generate yearly projections
  const projections: YearlyProjection[] = []
  for (let year = 1; year <= goal.timeHorizon; year++) {
    const value = calculateFutureValue(
      goal.monthlyContribution,
      goal.growthRate,
      year
    )
    projections.push({ year, value })
  }
  
  return {
    futureValue,
    isOnTrack,
    requiredMonthlyContribution,
    projections,
  }
}

/**
 * Calculate goal progress percentage
 */
export function calculateGoalProgress(currentValue: number, targetValue: number): number {
  return Math.min((currentValue / targetValue) * 100, 100)
}
