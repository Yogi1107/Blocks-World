import { useState, useEffect, useRef } from 'react'
import AlgoPanel        from './AlgoPanel'
import PlaybackControls from './PlaybackControls'
import TreeView         from './TreeView'

export default function SplitScreen({ bfsSteps, dfsSteps, goalState, bfsTree, dfsTree }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying,   setIsPlaying]   = useState(false)
  const [speed,       setSpeed]       = useState(1000)
  const intervalRef                   = useRef(null)

  const totalSteps = Math.max(bfsSteps.length, dfsSteps.length)

  useEffect(() => {
    clearInterval(intervalRef.current)
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps - 1) { setIsPlaying(false); return prev }
          return prev + 1
        })
      }, speed)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, speed, totalSteps])

  useEffect(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [bfsSteps, dfsSteps])

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex gap-4">
        <AlgoPanel title="BFS — Breadth First Search" color="blue"   steps={bfsSteps} currentStep={currentStep} goalState={goalState} />
        <AlgoPanel title="DFS — Depth First Search"   color="violet" steps={dfsSteps} currentStep={currentStep} goalState={goalState} />
      </div>

      <PlaybackControls
        isPlaying={isPlaying}
        onPlay={()         => setIsPlaying(true)}
        onPause={()        => setIsPlaying(false)}
        onReset={()        => { setIsPlaying(false); setCurrentStep(0) }}
        onStepForward={()  => setCurrentStep(s => Math.min(s + 1, totalSteps - 1))}
        onStepBack={()     => setCurrentStep(s => Math.max(s - 1, 0))}
        speed={speed}
        onSpeedChange={setSpeed}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {(bfsTree || dfsTree) && (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-white font-bold text-base">Search <span className="text-indigo-400">Trees</span></h3>
          <div className="flex gap-4">
            {bfsTree && (
              <div className="flex-1">
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2">BFS Tree</p>
                <TreeView treeNodes={bfsTree} currentStep={currentStep} steps={bfsSteps} color="blue" />
              </div>
            )}
            {dfsTree && (
              <div className="flex-1">
                <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">DFS Tree</p>
                <TreeView treeNodes={dfsTree} currentStep={currentStep} steps={dfsSteps} color="violet" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}