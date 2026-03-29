const SPEED_OPTIONS = [
  { label: 'Slow',   ms: 2000 },
  { label: 'Medium', ms: 1000 },
  { label: 'Fast',   ms: 300  },
]

export default function PlaybackControls({
  isPlaying, onPlay, onPause, onReset, onStepForward, onStepBack,
  speed, onSpeedChange, currentStep, totalSteps,
}) {
  const progressPercent = totalSteps > 1
    ? Math.round((currentStep / (totalSteps - 1)) * 100)
    : 0

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 flex flex-col gap-4">

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">

        {/* Playback buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-gray-400 hover:text-white transition text-lg px-2"
            title="Reset"
          >
            ⏮
          </button>
          <button
            onClick={onStepBack}
            disabled={currentStep === 0}
            className="text-gray-400 hover:text-white disabled:text-gray-700 transition text-lg px-2"
            title="Step back"
          >
            ⏪
          </button>

          {isPlaying ? (
            <button
              onClick={onPause}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold
                         px-5 py-2 rounded-lg transition text-sm"
            >
              ⏸ Pause
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold
                         px-5 py-2 rounded-lg transition text-sm"
            >
              ▶ Play
            </button>
          )}

          <button
            onClick={onStepForward}
            disabled={currentStep >= totalSteps - 1}
            className="text-gray-400 hover:text-white disabled:text-gray-700 transition text-lg px-2"
            title="Step forward"
          >
            ⏩
          </button>
        </div>

        {/* Speed selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Speed:</span>
          <div className="flex gap-1">
            {SPEED_OPTIONS.map(({ label, ms }) => (
              <button
                key={ms}
                onClick={() => onSpeedChange(ms)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  speed === ms
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}