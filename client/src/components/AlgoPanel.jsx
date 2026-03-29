import BlockStack from './BlockStack'
import LogsPanel  from './LogsPanel'

export default function AlgoPanel({ title, color, steps, currentStep, goalState }) {
  if (!steps || steps.length === 0) return null

  const step = steps[Math.min(currentStep, steps.length - 1)]
  const isGoalReached = step.move.includes('✅')

  const accentClass = color === 'blue'
    ? 'border-blue-500 text-blue-400'
    : 'border-violet-500 text-violet-400'

  const badgeClass = color === 'blue'
    ? 'bg-blue-900 text-blue-300'
    : 'bg-violet-900 text-violet-300'

  return (
    <div className={`flex-1 bg-gray-900 border-t-4 ${accentClass} rounded-xl p-5 flex flex-col gap-4`}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className={`text-base font-bold ${accentClass}`}>{title}</h3>
        <span className="text-xs text-gray-500">
          Step {step.stepIndex + 1} / {steps.length}
        </span>
      </div>

      {/* Current move badge */}
      <div className={`text-sm font-medium px-3 py-2 rounded-lg ${badgeClass}`}>
        {isGoalReached ? '🎉 ' : '↪ '}{step.move}
      </div>

      {/* Current state */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          Current State
        </p>
        <div className="flex gap-2 bg-gray-950 rounded-xl p-4">
          {step.state.map((peg, i) => (
            <BlockStack key={i} peg={peg} pegIndex={i} />
          ))}
        </div>
      </div>

      {/* Goal state */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          Goal State
        </p>
        <div className="flex gap-2 bg-gray-950 rounded-xl p-3">
          {goalState.map((peg, i) => (
            <BlockStack key={i} peg={peg} pegIndex={i} isGoal />
          ))}
        </div>
      </div>

      {/* Queue / Stack */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          {color === 'blue' ? '📋 Queue (BFS)' : '📚 Stack (DFS)'}
        </p>
        <div className="bg-gray-950 rounded-lg p-3 max-h-24 overflow-y-auto">
          {step.dataStructure.length === 0 ? (
            <span className="text-gray-600 text-xs">Empty</span>
          ) : (
            step.dataStructure.map((entry, i) => (
              <div key={i} className="text-xs text-gray-400 font-mono truncate">
                {i === 0
                  ? <span className={`font-bold ${accentClass}`}>{entry} ← front</span>
                  : entry
                }
              </div>
            ))
          )}
        </div>
      </div>

      {/* Logs panel */}
      <LogsPanel steps={steps} currentStep={currentStep} color={color} />

    </div>
  )
}