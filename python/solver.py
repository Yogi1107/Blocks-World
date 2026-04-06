import json
from collections import deque


# ─────────────────────────────────────────────
# State utilities
# ─────────────────────────────────────────────

def state_to_key(state):
    """Convert state to a hashable string for visited-set lookups."""
    return json.dumps(state, separators=(',', ':'))


def states_equal(a, b):
    """Check if two states are identical."""
    return a == b


def get_possible_moves(state):
    """
    Generate all valid (from_peg, to_peg) moves.
    A move picks the TOP block of one peg and places it on another.
    Returns list of (from_peg_index, to_peg_index, block_name).
    """
    moves = []
    num_pegs = len(state)

    for from_idx in range(num_pegs):
        if not state[from_idx]:          # peg is empty — nothing to move
            continue
        block = state[from_idx][-1]      # top block

        for to_idx in range(num_pegs):
            if from_idx == to_idx:
                continue
            moves.append((from_idx, to_idx, block))

    return moves


def apply_move(state, from_idx, to_idx):
    """
    Return a NEW state after moving top block from from_idx to to_idx.
    Never mutates the original state.
    """
    new_state = [list(peg) for peg in state]   # deep copy
    block = new_state[from_idx].pop()
    new_state[to_idx].append(block)
    return new_state


def describe_move(block, from_idx, to_idx):
    return f"Move {block} from Peg {from_idx + 1} → Peg {to_idx + 1}"


# ─────────────────────────────────────────────
# BFS
# ─────────────────────────────────────────────

def bfs(initial_state, goal_state):
    """
    Breadth-First Search — explores level by level using a Queue (deque).

    Returns a list of step dicts:
      {
        stepIndex: int,
        state: list,
        move: str,
        dataStructure: [str, ...],   # current queue snapshot (front first)
        treeNode: { id, parentId, state, move }
      }
    """
    steps = []
    visited = set()

    # Each queue item: (current_state, path_of_step_dicts)
    queue = deque()
    queue.append((initial_state, []))

    visited.add(state_to_key(initial_state))

    node_id_counter = [0]   # mutable counter inside closure

    def next_id():
        node_id_counter[0] += 1
        return node_id_counter[0]

    # Root tree node
    tree_nodes = []
    root_id = next_id()
    tree_nodes.append({
        "id": str(root_id),
        "parentId": None,
        "state": initial_state,
        "move": "Start"
    })

    # Record the initial step
    steps.append({
        "stepIndex": 0,
        "state": initial_state,
        "move": "Start — Initial State",
        "dataStructure": [state_to_key(s) for s, _ in queue],
        "treeNode": tree_nodes[-1]
    })

    # Map from state_key → tree node id (for parent linking)
    state_to_node_id = {state_to_key(initial_state): str(root_id)}

    while queue:
        current_state, history = queue.popleft()

        if states_equal(current_state, goal_state):
            steps.append({
                "stepIndex": len(steps),
                "state": current_state,
                "move": "Goal Reached!",
                "dataStructure": [],
                "treeNode": state_to_node_id.get(state_to_key(current_state))
            })
            break

        for from_idx, to_idx, block in get_possible_moves(current_state):
            new_state = apply_move(current_state, from_idx, to_idx)
            key = state_to_key(new_state)

            if key in visited:
                continue

            visited.add(key)

            move_desc = describe_move(block, from_idx, to_idx)

            # Build tree node
            parent_id = state_to_node_id.get(state_to_key(current_state))
            node_id = str(next_id())
            tree_node = {
                "id": node_id,
                "parentId": parent_id,
                "state": new_state,
                "move": move_desc
            }
            tree_nodes.append(tree_node)
            state_to_node_id[key] = node_id

            queue.append((new_state, history + [move_desc]))

            steps.append({
                "stepIndex": len(steps),
                "state": new_state,
                "move": move_desc,
                "dataStructure": [state_to_key(s) for s, _ in list(queue)[:5]],
                "treeNode": tree_node
            })

    return steps, tree_nodes


# ─────────────────────────────────────────────
# DFS
# ─────────────────────────────────────────────

def dfs(initial_state, goal_state):
    """
    Depth-First Search (DFS) without backtracking:
    - Explores a single path until goal or dead-end.
    - Returns steps and tree_nodes for visualization.
    """
    # Initialize
    path_stack = [initial_state]
    steps = []
    visited = {state_to_key(initial_state)}

    node_id_counter = [0]
    def next_id():
        node_id_counter[0] += 1
        return str(node_id_counter[0])

    # Initialize tree
    root_id = next_id()
    tree_nodes = [{
        "id": root_id,
        "parentId": None,
        "state": initial_state,
        "move": "Start"
    }]

    # Initial step
    steps.append({
        "stepIndex": 0,
        "state": initial_state,
        "move": "Start — Initial State",
        "dataStructure": [state_to_key(initial_state)],
        "treeNode": tree_nodes[-1]
    })

    current_state = initial_state
    parent_id = root_id
    goal_reached = False

    # DFS loop
    while True:
        if states_equal(current_state, goal_state):
            steps.append({
                "stepIndex": len(steps),
                "state": current_state,
                "move": "Goal Reached!",
                "dataStructure": [],
                "treeNode": parent_id
            })
            goal_reached = True
            break

        # Get valid moves
        possible_moves = [
            (f, t, b)
            for f, t, b in get_possible_moves(current_state)
            if state_to_key(apply_move(current_state, f, t)) not in visited
        ]

        if not possible_moves:
            # Dead-end reached
            break

        # Take the first available move
        from_idx, to_idx, block = possible_moves[0]
        new_state = apply_move(current_state, from_idx, to_idx)
        key = state_to_key(new_state)
        visited.add(key)

        move_desc = describe_move(block, from_idx, to_idx)
        node_id = next_id()
        tree_node = {
            "id": node_id,
            "parentId": parent_id,
            "state": new_state,
            "move": move_desc
        }
        tree_nodes.append(tree_node)
        parent_id = node_id

        # Add step with current DFS path as stack
        steps.append({
            "stepIndex": len(steps),
            "state": new_state,
            "move": move_desc,
            "dataStructure": [state_to_key(s) for s in path_stack],
            "treeNode": tree_node
        })

        # Update current state and stack
        current_state = new_state
        path_stack.append(new_state)

    # If goal not reached, show failure message
    if not goal_reached:
        steps.append({
            "stepIndex": len(steps),
            "state": current_state,
            "move": "DFS failed to reach the goal (dead-end reached)",
            "dataStructure": [state_to_key(s) for s in path_stack],
            "treeNode": None
        })

    return steps, tree_nodes


# ─────────────────────────────────────────────
# Main entry point — called by Node.js
# ─────────────────────────────────────────────

def solve(initial_state, goal_state):
    """
    Run both BFS and DFS and return combined JSON output.
    This is the function Node.js will call via child_process.
    """
    bfs_steps, bfs_tree = bfs(initial_state, goal_state)
    dfs_steps, dfs_tree = dfs(initial_state, goal_state)

    result = {
        "bfs": {
            "steps": bfs_steps,
            "tree": bfs_tree,
            "totalSteps": len(bfs_steps),
            "solved": any(s["move"] == "✅ Goal Reached!" for s in bfs_steps)
        },
        "dfs": {
            "steps": dfs_steps,
            "tree": dfs_tree,
            "totalSteps": len(dfs_steps),
            "solved": any(s["move"] == "✅ Goal Reached!" for s in dfs_steps)
        },
        "metrics": {
            "bfsStepsCount": len(bfs_steps),
            "dfsStepsCount": len(dfs_steps),
            "bfsTreeNodes": len(bfs_tree),
            "dfsTreeNodes": len(dfs_tree),
        }
    }

    return result


# ─────────────────────────────────────────────
# CLI entry — Node.js passes JSON via stdin
# ─────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    try:
        raw = sys.stdin.read()
        data = json.loads(raw)

        initial = data["initialState"]
        goal    = data["goalState"]

        output = solve(initial, goal)
        print(json.dumps(output))

    except Exception as e:
        error_response = {"error": str(e)}
        print(json.dumps(error_response))
        sys.exit(1)