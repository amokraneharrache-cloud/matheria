export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top navigation simple pour l'app élève */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">Matheria</span>
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                Espace élève
              </span>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-md mx-auto p-4 sm:p-6 lg:p-8 mt-4">
        {children}
      </main>
    </div>
  )
}
