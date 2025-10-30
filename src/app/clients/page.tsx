'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import Link from 'next/link'

export default function ClientsPage() {
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

  const mockClients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', netWorth: 850000, goals: 3, status: 'active' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', netWorth: 620000, goals: 2, status: 'active' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', netWorth: 1200000, goals: 5, status: 'active' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', netWorth: 450000, goals: 2, status: 'active' },
  ]

  return (
    <div className="flex">
      <Sidebar role="adviser" />
      
      <div className="flex-1 p-8 bg-background dark:bg-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Clients
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and view all your clients
              </p>
            </div>
            <Link
              href="/clients/new"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg font-semibold"
            >
              + Add New Client
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="glass rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search clients..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              />
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Clients Table */}
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary bg-opacity-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Client Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Net Worth
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Goals
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center font-semibold text-primary">
                          {client.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {client.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      R{client.netWorth.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {client.goals} goals
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90 transition-all text-sm">
                          View
                        </button>
                        <button className="px-3 py-1 bg-accent text-white rounded hover:bg-opacity-90 transition-all text-sm">
                          Report
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
