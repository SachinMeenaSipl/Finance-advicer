export interface User {
  id: string
  email: string
  name: string
  role: 'adviser' | 'admin'
  companyId?: string
  createdAt: Date
}

export interface Client {
  id: string
  adviserId: string
  personalDetails: PersonalDetails
  income: Income
  expenses: Expenses
  assets: Assets
  liabilities: Liabilities
  goals: Goal[]
  createdAt: Date
  updatedAt: Date
}

export interface PersonalDetails {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  email: string
  phone?: string
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed'
  dependents: number
  photo?: string
}

export interface Income {
  salary: number
  bonus: number
  other: number
  totalMonthly: number
}

export interface Expenses {
  rent: number
  groceries: number
  insurance: number
  transport: number
  utilities: number
  entertainment: number
  other: number
  totalMonthly: number
}

export interface Assets {
  bankSavings: number
  retirementAnnuity: number
  vehicles: number
  property: number
  investments: number
  other: number
  total: number
}

export interface Liabilities {
  creditCard: number
  personalLoan: number
  homeBond: number
  vehicleFinance: number
  other: number
  total: number
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  timeHorizon: number // in years
  monthlyContribution: number
  growthRate: number
  inflationRate: number
  feasibility?: GoalFeasibility
}

export interface GoalFeasibility {
  futureValue: number
  isOnTrack: boolean
  requiredMonthlyContribution?: number
  projections: YearlyProjection[]
}

export interface YearlyProjection {
  year: number
  value: number
}

export interface Company {
  id: string
  name: string
  logo?: string
  primaryColor: string
  secondaryColor: string
}

export interface DashboardStats {
  totalClients: number
  reportsGenerated: number
  averageSurplus: number
}
