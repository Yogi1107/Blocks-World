export default function LogsPanel({ steps, currentStep, color }) {
  const accent = color === 'blue' ? 'text-blue-400' : 'text-violet-400'

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
      <div className={`px-4 py-2 border-b border-gray-800 text-xs font-bold uppercase tracking-widest ${accent}`}>
        Execution Log
      </div>
      <div className="overflow-y-auto max-h-48 p-3 flex flex-col gap-1">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex gap-2 px-3 py-2 rounded-lg text-xs
              ${i === currentStep ? 'bg-gray-800 text-white font-medium' : ''}
              ${i < currentStep ? 'opacity-50 text-gray-400' : ''}
              ${i > currentStep ? 'opacity-25 text-gray-400' : ''}
            `}
          >
            <span className="text-gray-600 font-mono w-5">{String(i).padStart(2, '0')}</span>
            <span>{step.move}</span>
          </div>
        ))}
      </div>
    </div>
  )
}