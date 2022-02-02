import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  useZoomPanHelper,
  Controls,
} from "react-flow-renderer";

export default function ConnectivityFlowDiagram() {
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState([]);

  const { transform } = useZoomPanHelper();
  const flowKey = "flow_test";

  useEffect(() => {
    const restoreFlow = () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const [x, y] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };
    restoreFlow()
  },[transform])
  

  return (
    <div ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        elements={elements}
        nodesDraggable={false}
        draggable={false}
        paneMoveable={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
