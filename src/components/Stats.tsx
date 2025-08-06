'use client'

interface StatsProps {
  totalCount: number
  completedCount: number
  onClearCompleted: () => void
}

export default function Stats({ totalCount, completedCount, onClearCompleted }: StatsProps) {
  const pendingCount = totalCount - completedCount
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (totalCount === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Stats */}
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{totalCount}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-500">Progress</div>
          </div>
        </div>

        {/* Clear completed button */}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completionPercentage}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
