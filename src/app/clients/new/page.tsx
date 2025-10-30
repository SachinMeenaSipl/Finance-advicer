'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import PersonalDetailsStep from '@/components/wizard/PersonalDetailsStep'
import IncomeExpensesStep from '@/components/wizard/IncomeExpensesStep'
import AssetsLiabilitiesStep from '@/components/wizard/AssetsLiabilitiesStep'
import GoalsStep from '@/components/wizard/GoalsStep'
import { Client, PersonalDetails, Income, Expenses, Assets, Liabilities, Goal } from '@/types'

export default function NewClientPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [clientData, setClientData] = useState<Partial<Client>>({
    personalDetails: {} as PersonalDetails,
    income: { salary: 0, bonus: 0, other: 0, totalMonthly: 0 },
    expenses: { rent: 0, groceries: 0, insurance: 0, transport: 0, utilities: 0, entertainment: 0, other: 0, totalMonthly: 0 },
    assets: { bankSavings: 0, retirementAnnuity: 0, vehicles: 0, property: 0, investments: 0, other: 0, total: 0 },
    liabilities: { creditCard: 0, personalLoan: 0, homeBond: 0, vehicleFinance: 0, other: 0, total: 0 },
    goals: [],
  })

  const steps = [
    { number: 1, title: 'Personal Details', icon: '👤' },
    { number: 2, title: 'Income & Expenses', icon: '💰' },
    { number: 3, title: 'Assets & Liabilities', icon: '🏦' },
    { number: 4, title: 'Financial Goals', icon: '🎯' },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // In production, this would save to backend
    console.log('Saving client data:', clientData)
    alert('Client saved successfully!')
    router.push('/clients')
  }

  const updateClientData = (field: keyof Client, data: any) => {
    setClientData(prev => ({ ...prev, [field]: data }))
  }

  return (
    <div className="flex">
      <Sidebar role="adviser" />
      
      <div className="flex-1 p-8 bg-background dark:bg-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add New Client
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete the wizard to create a comprehensive financial plan
            </p>
          </div>

          {/* Progress Steps */}
          <div className="glass rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                        currentStep >= step.number
                          ? 'bg-primary text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className={`mt-2 text-xs text-center ${
                      currentStep >= step.number ? 'text-primary font-semibold' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="glass rounded-xl p-8">
            {currentStep === 1 && (
              <PersonalDetailsStep
                data={clientData.personalDetails!}
                onChange={(data) => updateClientData('personalDetails', data)}
              />
            )}
            {currentStep === 2 && (
              <IncomeExpensesStep
                income={clientData.income!}
                expenses={clientData.expenses!}
                onIncomeChange={(data) => updateClientData('income', data)}
                onExpensesChange={(data) => updateClientData('expenses', data)}
              />
            )}
            {currentStep === 3 && (
              <AssetsLiabilitiesStep
                assets={clientData.assets!}
                liabilities={clientData.liabilities!}
                onAssetsChange={(data) => updateClientData('assets', data)}
                onLiabilitiesChange={(data) => updateClientData('liabilities', data)}
              />
            )}
            {currentStep === 4 && (
              <GoalsStep
                goals={clientData.goals!}
                onChange={(data) => updateClientData('goals', data)}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ← Back
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Save Client
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
