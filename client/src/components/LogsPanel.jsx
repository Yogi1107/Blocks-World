import { useEffect, useRef } from 'react'

export default function LogsPanel({ steps, currentStep, color }) {
  const bottomRef = useRef(null)

  // Auto-scroll to current step
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [currentStep])

  const accentClass = color === 'blue' ? 'text-blue-400' : 'text-violet-400'
  const dotClass    = color === 'blue' ? 'bg-blue-500'   : 'bg-violet-500'

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-800 flex items-center gap-2">
        <span className={`text-xs font-bold uppercase tracking-widest ${accentClass}`}>
          Execution Log
        </span>
      </div>

      <div className="overflow-y-auto max-h-48 p-3 flex flex-col gap-1.5">
        {steps.map((step, i) => {
          const isCurrent = i === currentStep
          const isPast    = i < currentStep
          const isFuture  = i > currentStep

          return (
            <div
              key={i}
              ref={isCurrent ? bottomRef : null}
              className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs
                transition-all duration-300
                ${isCurrent ? 'bg-gray-800 ring-1 ring-inset ' + (color === 'blue' ? 'ring-blue-700' : 'ring-violet-700') : ''}
                ${isPast    ? 'opacity-50' : ''}
                ${isFuture  ? 'opacity-25' : ''}
              `}
            >
              {/* Step dot */}
              <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                ${isCurrent ? dotClass : 'bg-gray-600'}`}
              />

              {/* Step number */}
              <span className="text-gray-600 font-mono w-6 flex-shrink-0">
                {String(i).padStart(2, '0')}
              </span>

              {/* Move description */}
              <span className={isCurrent ? 'text-white font-medium' : 'text-gray-400'}>
                {step.move}
              </span>

              {/* State snapshot */}
              <span className="text-gray-600 font-mono ml-auto flex-shrink-0">
                {JSON.stringify(step.state)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}