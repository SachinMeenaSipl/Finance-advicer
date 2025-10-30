'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import StatCard from '@/components/ui/StatCard'
import { formatZAR } from '@/lib/calculations'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/admin/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/login')
      return
    }
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  return (
    <div className="flex">
      <Sidebar role="admin" />
      
      <div className="flex-1 p-8 bg-background dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard 🏢
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your brokerage and advisers
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Advisers"
              value="12"
              icon="👔"
              trend={{ value: 2, isPositive: true }}
            />
            <StatCard
              title="Total Clients"
              value="287"
              icon="👥"
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Reports This Month"
              value="156"
              icon="📄"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Avg. Portfolio Value"
              value={formatZAR(450000)}
              icon="💼"
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          {/* Top Advisers */}
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Top Performing Advisers
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', clients: 45, reports: 89, avgPortfolio: 520000 },
                { name: 'Michael Chen', clients: 38, reports: 76, avgPortfolio: 480000 },
                { name: 'Emma Williams', clients: 32, reports: 64, avgPortfolio: 410000 },
              ].map((adviser, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary bg-opacity-30 rounded-full flex items-center justify-center font-bold text-lg">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {adviser.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {adviser.clients} clients • {adviser.reports} reports
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Portfolio</p>
                    <p className="font-semibold text-lg text-primary">
                      {formatZAR(adviser.avgPortfolio)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Company Branding
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Customize your company logo and colors for client reports
              </p>
              <button className="px-4 py-2 bg-secondary text-gray-800 rounded-lg hover:bg-opacity-90 transition-all font-semibold">
                Update Branding
              </button>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Adviser Management
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Add new advisers or manage existing adviser accounts
              </p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-semibold">
                Manage Advisers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
