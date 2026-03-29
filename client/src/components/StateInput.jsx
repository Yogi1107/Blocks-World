import { useState } from 'react'

// Each peg is one column. Blocks stack bottom-to-top visually (rendered top-to-bottom in reverse).
export default function StateInput({ label, value, onChange }) {
  const [newBlock, setNewBlock] = useState(['', '', ''])

  // Add a block to a specific peg
  const handleAddBlock = (pegIndex) => {
    const blockName = newBlock[pegIndex].trim().toUpperCase()

    if (!blockName) return

    // Block names must be single letters A-Z
    if (!/^[A-Z]$/.test(blockName)) {
      alert('Block name must be a single letter (A–Z)')
      return
    }

    // Check for duplicate block names across ALL pegs
    const allBlocks = value.flat()
    if (allBlocks.includes(blockName)) {
      alert(`Block "${blockName}" already exists in this state`)
      return
    }

    const updated = value.map((peg, i) =>
      i === pegIndex ? [...peg, blockName] : peg
    )
    onChange(updated)

    // Clear only that peg's input
    const clearedInputs = [...newBlock]
    clearedInputs[pegIndex] = ''
    setNewBlock(clearedInputs)
  }

  // Remove the top block from a peg
  const handleRemoveTop = (pegIndex) => {
    const updated = value.map((peg, i) =>
      i === pegIndex ? peg.slice(0, -1) : peg
    )
    onChange(updated)
  }

  const handleInputChange = (pegIndex, text) => {
    const updated = [...newBlock]
    updated[pegIndex] = text
    setNewBlock(updated)
  }

  const handleKeyDown = (e, pegIndex) => {
    if (e.key === 'Enter') handleAddBlock(pegIndex)
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex-1">
      {/* Panel label */}
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        {label}
      </h3>

      {/* Pegs */}
      <div className="flex gap-4 justify-center">
        {value.map((peg, pegIndex) => (
          <div key={pegIndex} className="flex flex-col items-center gap-2 w-24">

            {/* Peg label */}
            <span className="text-xs text-gray-500 font-medium">
              Peg {pegIndex + 1}
            </span>

            {/* Block stack — rendered top to bottom (reversed) */}
            <div className="flex flex-col-reverse gap-1 min-h-[120px] justify-start w-full">
              {peg.map((block, blockIndex) => (
                <div
                  key={blockIndex}
                  className="bg-indigo-600 text-white text-sm font-bold rounded-md 
                             flex items-center justify-center h-9 w-full shadow-md
                             border border-indigo-400"
                >
                  {block}
                </div>
              ))}
            </div>

            {/* Peg base line */}
            <div className="w-full h-0.5 bg-gray-600 rounded" />

            {/* Remove top block button */}
            <button
              onClick={() => handleRemoveTop(pegIndex)}
              disabled={peg.length === 0}
              className="text-xs text-red-400 hover:text-red-300 disabled:text-gray-700 
                         disabled:cursor-not-allowed transition"
            >
              Remove top
            </button>

            {/* Add block input */}
            <div className="flex gap-1 w-full">
              <input
                type="text"
                maxLength={1}
                value={newBlock[pegIndex]}
                onChange={(e) => handleInputChange(pegIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, pegIndex)}
                placeholder="A"
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-2 py-1
                           text-white text-sm text-center uppercase focus:outline-none 
                           focus:border-indigo-500"
              />
              <button
                onClick={() => handleAddBlock(pegIndex)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs 
                           rounded-md px-2 font-bold transition"
              >
                +
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}