import { useLocation } from "react-router-dom";
import TreeView from "../components/TreeView";

const TreeRepresentation = () => {
  const { state } = useLocation();

  const { bfsTree, dfsTree, currentStep, bfsSteps, dfsSteps } = state || {};

  return (
    <>
    <div className="p-5">
        {(bfsTree || dfsTree) && (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-white font-bold text-base">Search <span className="text-indigo-400">Trees</span></h3>
          <div className="flex gap-4">
            {bfsTree && (
              <div className="flex-1">
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2">BFS Tree</p>
                <TreeView treeNodes={bfsTree} currentStep={currentStep} steps={bfsSteps} color="blue" />
              </div>
            )}
            {dfsTree && (
              <div className="flex-1">
                <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">DFS Tree</p>
                <TreeView treeNodes={dfsTree} currentStep={currentStep} steps={dfsSteps} color="violet" />
              </div>
            )}
          </div>
        </div>
      )}
</div>
        </>
  );


};

export default TreeRepresentation;