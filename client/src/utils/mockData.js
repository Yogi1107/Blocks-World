// Mock BFS steps for the demo:
// Initial: [["A","B"], ["C"], []]
// Goal:    [["A"], ["B","C"], []]

export const MOCK_BFS_STEPS = [
  {
    stepIndex: 0,
    state: [["A", "B"], ["C"], []],
    move: "Start — Initial State",
    dataStructure: ['[["A","B"],["C"],[]]'],
  },
  {
    stepIndex: 1,
    state: [["A"], ["C"], ["B"]],
    move: "Move B from Peg 1 → Peg 3",
    dataStructure: ['[["A"],["C"],["B"]]', '[["A","B"],["C"],[]]'],
  },
  {
    stepIndex: 2,
    state: [["A"], ["C", "B"], []],
    move: "Move B from Peg 3 → Peg 2",
    dataStructure: ['[["A"],["C","B"],[]]'],
  },
  {
    stepIndex: 3,
    state: [["A"], ["B", "C"], []],  // Wait — goal has B then C not C then B
    move: "Move C from Peg 2 → Peg 3",
    dataStructure: ['[["A"],["B","C"],[]]'],
  },
  {
    stepIndex: 4,
    state: [["A"], ["B", "C"], []],
    move: "✅ Goal Reached!",
    dataStructure: [],
  },
]

export const MOCK_DFS_STEPS = [
  {
    stepIndex: 0,
    state: [["A", "B"], ["C"], []],
    move: "Start — Initial State",
    dataStructure: ['[["A","B"],["C"],[]]'],
  },
  {
    stepIndex: 1,
    state: [["A", "B"], [], ["C"]],
    move: "Move C from Peg 2 → Peg 3",
    dataStructure: ['[["A","B"],[],["C"]]'],
  },
  {
    stepIndex: 2,
    state: [["A"], ["B"], ["C"]],
    move: "Move B from Peg 1 → Peg 2",
    dataStructure: ['[["A"],["B"],["C"]]'],
  },
  {
    stepIndex: 3,
    state: [["A"], ["B", "C"], []],
    move: "Move C from Peg 3 → Peg 2",
    dataStructure: ['[["A"],["B","C"],[]]'],
  },
  {
    stepIndex: 4,
    state: [["A"], ["B", "C"], []],
    move: "✅ Goal Reached!",
    dataStructure: [],
  },
]