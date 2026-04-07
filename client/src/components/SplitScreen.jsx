import { useState, useEffect, useRef } from 'react'
import AlgoPanel        from './AlgoPanel'
import PlaybackControls from './PlaybackControls'
import TreeView         from './TreeView'
import {useNavigate} from 'react-router-dom'

export default function SplitScreen({ bfsSteps, dfsSteps, goalState, bfsTree, dfsTree }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying,   setIsPlaying]   = useState(false)
  const [speed,       setSpeed]       = useState(1000)
  const intervalRef                   = useRef(null)

  const totalSteps = Math.max(bfsSteps.length, dfsSteps.length)

const navigate = useNavigate();

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


{/* New page content(tree representation) */}

<div className="flex flex-col items-center justify-center gap-2">
  <h1 className="font-bold">Tree Representation</h1>
  <button onClick={() =>navigate("/tree_representation", {
    state: { bfsTree, dfsTree, currentStep, bfsSteps, dfsSteps }
  })} className="cursor-pointer text-xs px-3 py-1.5 rounded-lg font-medium bg-indigo-400 text-gray-400 hover:text-white">View</button>
</div>
      
    </div>
  )
}