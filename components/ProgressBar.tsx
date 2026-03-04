interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  color?: 'green' | 'red' | 'blue';
}

export default function ProgressBar({ 
  percentage, 
  showLabel = true,
  color = 'green' 
}: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)
  
  const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  }

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 mt-1">
          {clampedPercentage.toFixed(0)}%
        </p>
      )}
    </div>
  )
}
