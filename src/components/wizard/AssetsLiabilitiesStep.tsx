import { Assets, Liabilities } from '@/types'
import { formatZAR, calculateNetWorth } from '@/lib/calculations'
import { useEffect, useState } from 'react'

interface AssetsLiabilitiesStepProps {
  assets: Assets
  liabilities: Liabilities
  onAssetsChange: (data: Assets) => void
  onLiabilitiesChange: (data: Liabilities) => void
}

export default function AssetsLiabilitiesStep({
  assets,
  liabilities,
  onAssetsChange,
  onLiabilitiesChange,
}: AssetsLiabilitiesStepProps) {
  const [netWorth, setNetWorth] = useState(0)

  useEffect(() => {
    const totalAssets = 
      (assets.bankSavings || 0) + 
      (assets.retirementAnnuity || 0) + 
      (assets.vehicles || 0) + 
      (assets.property || 0) + 
      (assets.investments || 0) + 
      (assets.other || 0)
    
    const totalLiabilities = 
      (liabilities.creditCard || 0) + 
      (liabilities.personalLoan || 0) + 
      (liabilities.homeBond || 0) + 
      (liabilities.vehicleFinance || 0) + 
      (liabilities.other || 0)
    
    onAssetsChange({ ...assets, total: totalAssets })
    onLiabilitiesChange({ ...liabilities, total: totalLiabilities })
    setNetWorth(calculateNetWorth(totalAssets, totalLiabilities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    assets.bankSavings, assets.retirementAnnuity, assets.vehicles, assets.property, assets.investments, assets.other,
    liabilities.creditCard, liabilities.personalLoan, liabilities.homeBond, liabilities.vehicleFinance, liabilities.other
  ])

  const handleAssetsChange = (field: keyof Assets, value: number) => {
    onAssetsChange({ ...assets, [field]: value })
  }

  const handleLiabilitiesChange = (field: keyof Liabilities, value: number) => {
    onLiabilitiesChange({ ...liabilities, [field]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Assets & Liabilities
      </h2>

      {/* Assets Section */}
      <div className="p-6 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">
          Assets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bank Savings
            </label>
            <input
              type="number"
              value={assets.bankSavings || ''}
              onChange={(e) => handleAssetsChange('bankSavings', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Retirement Annuity
            </label>
            <input
              type="number"
              value={assets.retirementAnnuity || ''}
              onChange={(e) => handleAssetsChange('retirementAnnuity', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vehicles
            </label>
            <input
              type="number"
              value={assets.vehicles || ''}
              onChange={(e) => handleAssetsChange('vehicles', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Property
            </label>
            <input
              type="number"
              value={assets.property || ''}
              onChange={(e) => handleAssetsChange('property', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Investments
            </label>
            <input
              type="number"
              value={assets.investments || ''}
              onChange={(e) => handleAssetsChange('investments', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Other Assets
            </label>
            <input
              type="number"
              value={assets.other || ''}
              onChange={(e) => handleAssetsChange('other', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Assets: </span>
          <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
            {formatZAR(assets.total || 0)}
          </span>
        </div>
      </div>

      {/* Liabilities Section */}
      <div className="p-6 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded-lg">
        <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-4">
          Liabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Credit Card
            </label>
            <input
              type="number"
              value={liabilities.creditCard || ''}
              onChange={(e) => handleLiabilitiesChange('creditCard', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Personal Loan
            </label>
            <input
              type="number"
              value={liabilities.personalLoan || ''}
              onChange={(e) => handleLiabilitiesChange('personalLoan', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Home Bond
            </label>
            <input
              type="number"
              value={liabilities.homeBond || ''}
              onChange={(e) => handleLiabilitiesChange('homeBond', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vehicle Finance
            </label>
            <input
              type="number"
              value={liabilities.vehicleFinance || ''}
              onChange={(e) => handleLiabilitiesChange('vehicleFinance', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Other Liabilities
            </label>
            <input
              type="number"
              value={liabilities.other || ''}
              onChange={(e) => handleLiabilitiesChange('other', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Liabilities: </span>
          <span className="text-lg font-bold text-orange-700 dark:text-orange-400">
            {formatZAR(liabilities.total || 0)}
          </span>
        </div>
      </div>

      {/* Net Worth */}
      <div className={`p-6 rounded-lg ${netWorth >= 0 ? 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20' : 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Net Worth (Assets - Liabilities)
          </h3>
          <div className={`text-3xl font-bold ${netWorth >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {formatZAR(netWorth)}
          </div>
        </div>
      </div>
    </div>
  )
}
