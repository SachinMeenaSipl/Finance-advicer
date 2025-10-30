'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarProps {
  role: 'adviser' | 'admin'
}

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const adviserLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/clients', label: 'Clients', icon: '👥' },
    { href: '/reports', label: 'Reports', icon: '📄' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/advisers', label: 'Advisers', icon: '👔' },
    { href: '/admin/branding', label: 'Branding', icon: '🎨' },
    { href: '/admin/reports', label: 'All Reports', icon: '📄' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ]

  const links = role === 'admin' ? adminLinks : adviserLinks

  return (
    <div className="w-64 bg-primary dark:bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Financial Planner</h2>
        <p className="text-xs text-gray-300">
          {role === 'admin' ? 'Admin Portal' : 'Adviser Portal'}
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === link.href
                ? 'bg-white bg-opacity-20 font-semibold'
                : 'hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-white border-opacity-20 pt-4 mt-4 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
        >
          <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
          <span>Dark Mode</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all text-red-300"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
