import { useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

// Convert flat tree node list → ReactFlow nodes + edges
function buildGraphElements(treeNodes, currentNodeId, color) {
  if (!treeNodes || treeNodes.length === 0) return { nodes: [], edges: [] }

  const accentColor = color === 'blue' ? '#3b82f6' : '#8b5cf6'
  const nodeSpacingX = 160
  const nodeSpacingY = 110

  // Group nodes by depth using BFS on the tree
  const depthMap = {}
  const childrenMap = {}

  treeNodes.forEach(n => {
    childrenMap[n.id] = []
  })
  treeNodes.forEach(n => {
    if (n.parentId) {
      childrenMap[n.parentId]?.push(n.id)
    }
  })

  // BFS to assign depths
  const root = treeNodes.find(n => !n.parentId)
  if (!root) return { nodes: [], edges: [] }

  const queue = [{ id: root.id, depth: 0 }]
  const positionMap = {}

  while (queue.length > 0) {
    const { id, depth } = queue.shift()
    depthMap[id] = depth
    const children = childrenMap[id] || []
    children.forEach(childId => queue.push({ id: childId, depth: depth + 1 }))
  }

  // Group by depth for X positioning
  const depthGroups = {}
  treeNodes.forEach(n => {
    const d = depthMap[n.id] ?? 0
    if (!depthGroups[d]) depthGroups[d] = []
    depthGroups[d].push(n.id)
  })

  Object.entries(depthGroups).forEach(([depth, ids]) => {
    const totalWidth = (ids.length - 1) * nodeSpacingX
    ids.forEach((id, i) => {
      positionMap[id] = {
        x: i * nodeSpacingX - totalWidth / 2,
        y: parseInt(depth) * nodeSpacingY,
      }
    })
  })

  const nodes = treeNodes.map(n => ({
    id: n.id,
    position: positionMap[n.id] || { x: 0, y: 0 },
    data: {
      label: (
        <div className="text-center">
          <div className="text-xs font-bold text-white leading-tight">
            {n.move === 'Start' ? '▶ Start' : n.move}
          </div>
          <div className="text-gray-400 text-xs mt-1 font-mono">
            {JSON.stringify(n.state).slice(0, 24)}…
          </div>
        </div>
      ),
    },
    style: {
      background: n.id === currentNodeId
        ? accentColor
        : n.id === root.id
          ? '#374151'
          : '#1f2937',
      border: `1px solid ${n.id === currentNodeId ? accentColor : '#374151'}`,
      borderRadius: '8px',
      padding: '6px 10px',
      fontSize: '11px',
      width: 140,
      color: '#fff',
    },
  }))

  const edges = treeNodes
    .filter(n => n.parentId)
    .map(n => ({
      id:     `${n.parentId}-${n.id}`,
      source: n.parentId,
      target: n.id,
      style:  { stroke: '#374151', strokeWidth: 1.5 },
      animated: n.id === currentNodeId,
    }))

  return { nodes, edges }
}

export default function TreeView({ treeNodes, currentStep, steps, color }) {
  const currentNodeId = steps?.[currentStep]?.treeNode?.id ?? null

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildGraphElements(treeNodes, currentNodeId, color),
    [treeNodes, currentNodeId, color]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const { nodes: n, edges: e } = buildGraphElements(treeNodes, currentNodeId, color)
    setNodes(n)
    setEdges(e)
  }, [currentNodeId, treeNodes, color])

  const accentColor = color === 'blue' ? '#3b82f6' : '#8b5cf6'

  return (
    <div style={{ height: 320 }} className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#374151" gap={20} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={n => n.style?.background ?? '#1f2937'}
          style={{ background: '#111827' }}
        />
      </ReactFlow>
    </div>
  )
}