'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import StatCard from '@/components/ui/StatCard'
import { formatZAR } from '@/lib/calculations'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) return null

  return (
    <div className="flex">
      <Sidebar role="adviser" />
      
      <div className="flex-1 p-8 bg-background dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here&apos;s what&apos;s happening with your clients today
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Clients"
              value="24"
              icon="👥"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Reports Generated"
              value="156"
              icon="📄"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Avg. Client Surplus"
              value={formatZAR(8500)}
              icon="💰"
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/clients/new"
                className="flex items-center gap-4 p-4 bg-primary bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
              >
                <span className="text-3xl">➕</span>
                <div>
                  <h3 className="font-semibold text-primary dark:text-accent">Add New Client</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Start a new financial plan
                  </p>
                </div>
              </Link>
              <Link
                href="/clients"
                className="flex items-center gap-4 p-4 bg-accent bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
              >
                <span className="text-3xl">👥</span>
                <div>
                  <h3 className="font-semibold text-accent">View All Clients</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage existing clients
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Clients */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Clients
            </h2>
            <div className="space-y-3">
              {[
                { name: 'John Doe', status: 'Goals on track', surplus: 5200 },
                { name: 'Sarah Smith', status: 'Needs review', surplus: -1200 },
                { name: 'Michael Johnson', status: 'Goals on track', surplus: 8900 },
              ].map((client, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center font-semibold text-primary">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {client.name}
                      </h3>
                      <p className={`text-sm ${client.surplus > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {client.status} • {formatZAR(Math.abs(client.surplus))} {client.surplus > 0 ? 'surplus' : 'deficit'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/clients/${idx}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all text-sm"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
