from solver import solve
import json

# ── Test 1: Documentation demo ──────────────────
print("=" * 50)
print("TEST 1: Documentation Demo Example")
print("=" * 50)

initial = [["A", "B"], ["C"], []]
goal    = [["A"], ["B", "C"], []]

result = solve(initial, goal)

print(f"\nBFS: {result['bfs']['totalSteps']} steps | Solved: {result['bfs']['solved']}")
print(f"DFS: {result['dfs']['totalSteps']} steps | Solved: {result['dfs']['solved']}")

print("\n── BFS Steps ──")
for step in result["bfs"]["steps"]:
    print(f"  Step {step['stepIndex']}: {step['move']}")
    print(f"           State: {step['state']}")

print("\n── DFS Steps ──")
for step in result["dfs"]["steps"]:
    print(f"  Step {step['stepIndex']}: {step['move']}")
    print(f"           State: {step['state']}")

print("\n── Metrics ──")
print(json.dumps(result["metrics"], indent=2))


# ── Test 2: Already at goal ──────────────────────
print("\n" + "=" * 50)
print("TEST 2: Already at Goal (edge case)")
print("=" * 50)

same_state = [["A"], ["B"], []]
result2 = solve(same_state, same_state)
print(f"BFS solved: {result2['bfs']['solved']}")
print(f"DFS solved: {result2['dfs']['solved']}")


# ── Test 3: Single block ─────────────────────────
print("\n" + "=" * 50)
print("TEST 3: Single Block")
print("=" * 50)

result3 = solve([["A"], [], []], [[], ["A"], []])
print(f"BFS steps: {result3['bfs']['totalSteps']} | Solved: {result3['bfs']['solved']}")
for step in result3["bfs"]["steps"]:
    print(f"  {step['move']} → {step['state']}")