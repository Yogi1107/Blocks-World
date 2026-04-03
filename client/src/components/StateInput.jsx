import { useState } from 'react'

export default function StateInput({ label, value, onChange }) {
  const [inputs, setInputs] = useState(['', '', ''])

  const addBlock = (pegIdx) => {
    const block = inputs[pegIdx].trim().toUpperCase()
    if (!block) return
    if (!/^[A-Z]$/.test(block)) { alert('Block must be a single letter A–Z'); return }
    if (value.flat().includes(block)) { alert(`Block "${block}" already exists`); return }

    onChange(value.map((peg, i) => i === pegIdx ? [...peg, block] : peg))
    setInputs(inputs.map((v, i) => i === pegIdx ? '' : v))
  }

  const removeTop = (pegIdx) => {
    onChange(value.map((peg, i) => i === pegIdx ? peg.slice(0, -1) : peg))
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex-1">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">{label}</h3>

      <div className="flex gap-4 justify-center">
        {value.map((peg, pegIdx) => (
          <div key={pegIdx} className="flex flex-col items-center gap-2 w-24">
            <span className="text-xs text-gray-500">Peg {pegIdx + 1}</span>

            <div className="flex flex-col-reverse gap-1 min-h-[120px] justify-start w-full">
              {peg.map((block, i) => (
                <div key={i} className="bg-indigo-600 border border-indigo-400 text-white text-sm font-bold rounded-md flex items-center justify-center h-9 w-full">
                  {block}
                </div>
              ))}
            </div>

            <div className="w-full h-0.5 bg-gray-600 rounded" />

            <button
              onClick={() => removeTop(pegIdx)}
              disabled={peg.length === 0}
              className="text-xs text-red-400 hover:text-red-300 disabled:text-gray-700 disabled:cursor-not-allowed"
            >
              Remove top
            </button>

            <div className="flex gap-1 w-full">
              <input
                type="text" maxLength={1}
                value={inputs[pegIdx]}
                onChange={e => setInputs(inputs.map((v, i) => i === pegIdx ? e.target.value : v))}
                onKeyDown={e => e.key === 'Enter' && addBlock(pegIdx)}
                placeholder="A"
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-white text-sm text-center uppercase focus:outline-none focus:border-indigo-500"
              />
              <button onClick={() => addBlock(pegIdx)} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-md px-2 font-bold">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}