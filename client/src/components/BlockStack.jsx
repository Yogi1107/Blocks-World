import { motion, AnimatePresence } from 'framer-motion'

// Colour palette — each block letter gets a consistent colour
const BLOCK_COLORS = {
  A: 'bg-indigo-500 border-indigo-300',
  B: 'bg-emerald-500 border-emerald-300',
  C: 'bg-amber-500  border-amber-300',
  D: 'bg-rose-500   border-rose-300',
  E: 'bg-purple-500 border-purple-300',
  F: 'bg-cyan-500   border-cyan-300',
}

const DEFAULT_COLOR = 'bg-gray-500 border-gray-300'

export default function BlockStack({ peg, pegIndex, isGoal = false }) {
  const colorFor = (block) => BLOCK_COLORS[block] ?? DEFAULT_COLOR

  return (
    <div className="flex flex-col items-center gap-1 flex-1">

      {/* Peg label */}
      <span className="text-xs text-gray-500 font-semibold mb-1">
        Peg {pegIndex + 1}
      </span>

      {/* Block area — fixed height so pegs don't shift layout */}
      <div className="flex flex-col-reverse gap-1 h-40 w-full justify-start items-center">
        <AnimatePresence>
          {peg.map((block, blockIdx) => (
            <motion.div
              key={block}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0,   scale: 1   }}
              exit={{    opacity: 0, y:  20,  scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`
                ${colorFor(block)}
                ${isGoal ? 'opacity-60' : ''}
                border text-white font-bold text-sm rounded-md
                flex items-center justify-center
                w-14 h-9 shadow-md select-none
              `}
            >
              {block}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Peg base */}
      <div className={`w-full h-0.5 rounded ${isGoal ? 'bg-gray-700' : 'bg-gray-500'}`} />
    </div>
  )
}