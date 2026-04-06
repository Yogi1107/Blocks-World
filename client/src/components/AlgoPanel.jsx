import BlockStack from './BlockStack'
import LogsPanel from './LogsPanel'

export default function AlgoPanel({ title, color, steps, currentStep, goalState }) {
  if (!steps || steps.length === 0) return null

  const step = steps[Math.min(currentStep, steps.length - 1)]
  const accent = color === 'blue' ? 'border-blue-500 text-blue-400' : 'border-violet-500 text-violet-400'
  const badge = color === 'blue' ? 'bg-blue-900 text-blue-300' : 'bg-violet-900 text-violet-300'

  return (
    <div className={`flex-1 bg-gray-900 border-t-4 ${accent} rounded-xl p-5 flex flex-col gap-4`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className={`text-base font-bold ${accent}`}>{title}</h3>
        <span className="text-xs text-gray-500">Step {step.stepIndex + 1} / {steps.length}</span>
      </div>

      {/* Move badge */}
      <div className={`text-sm font-medium px-3 py-2 rounded-lg ${badge}`}>
        {step.move}
      </div>

      {/* Current state */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Current State</p>
        <div className="flex gap-2 bg-gray-950 rounded-xl p-4">
          {step.state.map((peg, i) => <BlockStack key={i} peg={peg} pegIndex={i} />)}
        </div>
      </div>

      {/* Goal state */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Goal State</p>
        <div className="flex gap-2 bg-gray-950 rounded-xl p-3">
          {goalState.map((peg, i) => <BlockStack key={i} peg={peg} pegIndex={i} isGoal />)}
        </div>
      </div>

      {/* Queue / Stack */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          {color === 'blue' ? 'Queue (BFS)' : 'Stack (DFS)'}
        </p>
        <div className="bg-gray-950 rounded-lg p-3 max-h-24 overflow-y-auto">
          {step.dataStructure.length === 0 ? (
            <span className="text-gray-600 text-xs">Empty</span>
          ) : (
            // Reverse for DFS so the top of the stack is first
            [...(color === 'blue' ? step.dataStructure : step.dataStructure)].reverse().map((entry, i) => (
              <div
                key={i}
                className={`text-xs font-mono truncate ${i === 0 ? `font-bold ${accent}` : 'text-gray-400'}`}
              >
                {i === 0
                  ? color === 'blue'
                    ? `${entry} ← front`
                    : `${entry} ← top`
                  : entry}
              </div>
            ))
          )}
        </div>
      </div>

      <LogsPanel steps={steps} currentStep={currentStep} color={color} />
    </div>
  )
}