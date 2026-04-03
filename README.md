# Blocks World Visualization using BFS & DFS

A web-based application that demonstrates and compares **Breadth-First Search (BFS)** and **Depth-First Search (DFS)** algorithms through interactive, step-by-step visualization of the classic Blocks World problem.

Built with the **MERN stack** (MongoDB, Express, React, Node.js) and a **Python** algorithm engine.

---

## Features

- Define custom **initial and goal states** for blocks
- **Split-screen simultaneous execution** of BFS and DFS
- Step-by-step **block movement animation**
- Live visualization of **Queue (BFS)** and **Stack (DFS)** operations
- **Search tree** rendering with node highlighting
- Real-time **execution logs and performance metrics**
- **Speed control** (slow / medium / fast) with play, pause, and reset
- **Prebuilt demo example** for quick exploration
- **Algorithm comparison dashboard** (theoretical + practical metrics)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Tailwind CSS, React Flow, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Algorithm Engine | Python (BFS & DFS logic, JSON generation) |

---

## System Architecture

```
Frontend (React)
      ↓
Backend (Node.js / Express)
      ↓
Python Algorithm Engine
      ↓
MongoDB (Storage)
```

### API Endpoints

| Endpoint | Description |
|---|---|
| `POST /solve` | Run BFS and DFS on a given initial and goal state |
| `GET /example` | Load the prebuilt demo example |

---

## Algorithm Design

### State Representation

Each state is represented as a list of stacks (columns of blocks):

```json
[["A", "B"], ["C"], []]
```

Each inner list is a stack, where the last element is the top of the stack.

### BFS — Breadth-First Search

- Uses a **Queue** (FIFO)
- Explores states level by level
- Guarantees the **optimal (shortest) solution**
- Time Complexity: `O(b^d)` | Space Complexity: `O(b^d)`

### DFS — Depth-First Search

- Uses a **Stack** (LIFO)
- Explores states depth-first
- Does **not** guarantee an optimal solution
- Time Complexity: `O(b^m)` | Space Complexity: `O(b·m)`

> Both algorithms avoid revisiting states (no backtracking).

### Algorithm Comparison

| Metric | BFS | DFS |
|---|---|---|
| Time Complexity | O(b^d) | O(b^m) |
| Space Complexity | O(b^d) | O(b·m) |
| Completeness | Yes | No |
| Optimality | Yes | No |

---

## Prebuilt Demo Example

**Initial State:**
```json
[["A", "B"], ["C"], []]
```

**Goal State:**
```json
[["A"], ["B", "C"], []]
```

Use this example to quickly explore the visualization and compare algorithm behavior.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- MongoDB (local or Atlas)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/blocks-world-bfs-dfs.git
cd blocks-world-bfs-dfs
```

**2. Install backend dependencies**
```bash
cd server
npm install
```

**3. Install frontend dependencies**
```bash
cd ../client
npm install
```

**4. Configure environment variables**

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blocksworld
PYTHON_PATH=../python/solver.py
```

### Running the App

**Start MongoDB** (if running locally):
```bash
mongod
```

**Start the backend:**
```bash
cd server
npm run dev
```

**Start the frontend:**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Speed Control

| Level | Delay |
|---|---|
| Slow | 2000 ms |
| Medium | 1000 ms |
| Fast | 300 ms |

Use the slider or buttons to adjust animation speed at any time during playback.

---

## Team

| Role | Responsibilities |
|---|---|
| Frontend Developer | UI/UX, React components, split-screen layout, animations |
| Backend Developer | Express API, Python integration, MongoDB setup |
| Python Developer | BFS & DFS logic, state transitions, tree and log generation |

---

## Future Enhancements

- A\* search and other heuristic algorithms
- Drag-and-drop block interface
- Export execution as video
- Multi-user collaboration
- 3D visualization

---
