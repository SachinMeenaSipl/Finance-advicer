'use client'

import { Goal } from '@/types'
import { formatZAR, calculateGoalFeasibility } from '@/lib/calculations'
import { useState } from 'react'
import ProgressCircle from '@/components/ui/ProgressCircle'

interface GoalsStepProps {
  goals: Goal[]
  onChange: (goals: Goal[]) => void
}

export default function GoalsStep({ goals, onChange }: GoalsStepProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    name: '',
    targetAmount: 0,
    timeHorizon: 5,
    monthlyContribution: 0,
    growthRate: 6,
    inflationRate: 5,
  })

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.timeHorizon && newGoal.monthlyContribution) {
      const goal: Goal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: newGoal.targetAmount,
        timeHorizon: newGoal.timeHorizon,
        monthlyContribution: newGoal.monthlyContribution,
        growthRate: newGoal.growthRate || 6,
        inflationRate: newGoal.inflationRate || 5,
      }
      
      // Calculate feasibility
      goal.feasibility = calculateGoalFeasibility(goal)
      
      onChange([...goals, goal])
      setNewGoal({
        name: '',
        targetAmount: 0,
        timeHorizon: 5,
        monthlyContribution: 0,
        growthRate: 6,
        inflationRate: 5,
      })
      setShowAddForm(false)
    }
  }

  const handleRemoveGoal = (id: string) => {
    onChange(goals.filter(g => g.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Financial Goals
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          {showAddForm ? '✕ Cancel' : '+ Add Goal'}
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="p-6 bg-accent bg-opacity-10 rounded-lg border-2 border-accent">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            New Goal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Goal Name *
              </label>
              <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                placeholder="e.g., Buy House, Kids' Education"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Amount (R) *
              </label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                placeholder="1000000"
                min="0"
                step="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Horizon (Years) *
              </label>
              <input
                type="number"
                value={newGoal.timeHorizon}
                onChange={(e) => setNewGoal({ ...newGoal, timeHorizon: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                placeholder="5"
                min="1"
                max="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Contribution (R) *
              </label>
              <input
                type="number"
                value={newGoal.monthlyContribution}
                onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                placeholder="10000"
                min="0"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Growth Rate (% p.a.)
              </label>
              <input
                type="number"
                value={newGoal.growthRate}
                onChange={(e) => setNewGoal({ ...newGoal, growthRate: parseFloat(e.target.value) || 6 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                placeholder="6"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Inflation Rate (% p.a.)
              </label>
              <input
                type="number"
                value={newGoal.inflationRate}
                onChange={(e) => setNewGoal({ ...newGoal, inflationRate: parseFloat(e.target.value) || 5 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                placeholder="5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddGoal}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
            >
              Add Goal
            </button>
          </div>
        </div>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="text-center py-12 glass rounded-xl">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-gray-600 dark:text-gray-400">
            No goals added yet. Click &quot;Add Goal&quot; to create your first financial goal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="glass rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {goal.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Target: {formatZAR(goal.targetAmount)} in {goal.timeHorizon} years
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveGoal(goal.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  🗑️
                </button>
              </div>

              {goal.feasibility && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <ProgressCircle 
                      percentage={Math.min((goal.feasibility.futureValue / goal.targetAmount) * 100, 100)}
                      label="Goal Progress"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Monthly Contribution:</span>
                      <span className="font-semibold">{formatZAR(goal.monthlyContribution)}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Projected Value:</span>
                      <span className="font-semibold">{formatZAR(goal.feasibility.futureValue)}</span>
                    </div>
                    
                    {goal.feasibility.isOnTrack ? (
                      <div className="p-3 bg-green-100 dark:bg-green-900 dark:bg-opacity-20 rounded-lg text-green-800 dark:text-green-300">
                        ✅ Goal is on track!
                      </div>
                    ) : (
                      <div className="p-3 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 rounded-lg text-red-800 dark:text-red-300">
                        ⚠️ Increase monthly contribution to {formatZAR(goal.feasibility.requiredMonthlyContribution || 0)} to achieve target
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
