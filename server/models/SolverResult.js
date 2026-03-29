import mongoose from 'mongoose'

const solverResultSchema = new mongoose.Schema(
  {
    initialState: {
      type: [[String]],
      required: true,
    },
    goalState: {
      type: [[String]],
      required: true,
    },
    bfs: {
      totalSteps: Number,
      solved: Boolean,
      steps: mongoose.Schema.Types.Mixed,
      tree:  mongoose.Schema.Types.Mixed,
    },
    dfs: {
      totalSteps: Number,
      solved: Boolean,
      steps: mongoose.Schema.Types.Mixed,
      tree:  mongoose.Schema.Types.Mixed,
    },
    metrics: {
      bfsStepsCount: Number,
      dfsStepsCount: Number,
      bfsTreeNodes:  Number,
      dfsTreeNodes:  Number,
    },
  },
  { timestamps: true }   // adds createdAt, updatedAt automatically
)

const SolverResult = mongoose.model('SolverResult', solverResultSchema)
export default SolverResult