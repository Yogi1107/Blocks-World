const BLOCK_COLORS = {
  A: 'bg-indigo-500',
  B: 'bg-emerald-500',
  C: 'bg-amber-500',
  D: 'bg-rose-500',
  E: 'bg-purple-500',
  F: 'bg-cyan-500',
}

export default function BlockStack({ peg, pegIndex, isGoal = false }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <span className="text-xs text-gray-500 font-semibold mb-1">Peg {pegIndex + 1}</span>

      <div className="flex flex-col-reverse gap-1 h-40 w-full justify-start items-center">
        {peg.map((block, i) => (
          <div
            key={i}
            className={`
              ${BLOCK_COLORS[block] ?? 'bg-gray-500'}
              ${isGoal ? 'opacity-50' : ''}
              text-white font-bold text-sm rounded-md
              flex items-center justify-center
              w-14 h-9 shadow
            `}
          >
            {block}
          </div>
        ))}
      </div>

      <div className={`w-full h-0.5 rounded ${isGoal ? 'bg-gray-700' : 'bg-gray-500'}`} />
    </div>
  )
}