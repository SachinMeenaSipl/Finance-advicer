import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="glass rounded-2xl p-12 max-w-2xl text-center shadow-2xl">
        <h1 className="text-5xl font-bold text-primary dark:text-white mb-4">
          Financial Planning
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
          South Africa Edition
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Empowering financial advisers to build better futures
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/login"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg font-semibold"
          >
            Adviser Login
          </Link>
          <Link 
            href="/admin/login"
            className="px-8 py-3 bg-secondary text-gray-800 rounded-lg hover:bg-opacity-90 transition-all shadow-lg font-semibold"
          >
            Admin Login
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold text-primary dark:text-accent">POPIA Compliant</div>
            <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">Secure & Encrypted</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">🇿🇦</div>
            <div className="font-semibold text-primary dark:text-accent">SA Focused</div>
            <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">ZAR & Local Terms</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold text-primary dark:text-accent">Smart Analytics</div>
            <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">Goal Planning</div>
          </div>
        </div>
      </div>
    </main>
  )
}
