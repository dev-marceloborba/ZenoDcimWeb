import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  useZoomPanHelper,
  Controls,
} from "react-flow-renderer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function ConnectivityFlowDiagram() {
  const reactFlowWrapper = useRef(null);
  const [system, setSystem] = useState(options[0].name);
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const flowKey = "flow1";

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onElementClick = (event, element) => {
    console.log("click", element);
    setSelectedElement(element);
  };

  const handleSystemChange = (event) => setSystem(event.target.value);

  const handleEditSystem = (event) => {
    const elementsCpy = [...elements];
    elementsCpy.forEach((node) => {
      if (node.data.label === selectedElement?.data.label) {
        node.data.label = event.target.value;
      }
    });
    setElements(elementsCpy);
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const { transform } = useZoomPanHelper();
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: {
        label: system,
      },
      sourcePosition: "right",
      targetPosition: "left",
      position: {
        // x: Math.random() * window.innerWidth - 100,
        // y: Math.random() * window.innerHeight,
        x: 40,
        y: 400,
      },
    };
    setElements((els) => els.concat(newNode));
  }, [system]);

  const onRestore = useCallback(() => {
    const restoreFlow = () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const [x, y] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };

    restoreFlow();
  }, [setElements, transform]);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = rfInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getNodeId(),
      type,
      position,
      data: {
        label: `${type} node`,
      },
    };

    setElements((els) => els.concat(newNode));
  };

  return (
    <>
      <Button onClick={onAdd}>Adicionar</Button>
      <Button onClick={onSave}>Salvar</Button>
      <Button onClick={onRestore}>Restaurar</Button>
      <Sidebar />
      <TextField
        label={"Sistema"}
        color="primary"
        variant="outlined"
        select
        value={system}
        onChange={handleSystemChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <Box>
        <Typography>Elemento selecionado</Typography>
        <Typography>Id: {selectedElement?.id}</Typography>
        <Typography>
          Descrição:{" "}
          <TextField
            color="primary"
            variant="outlined"
            select
            value={selectedElement?.data.label ?? ""}
            onChange={handleEditSystem}
            defaultValue={""}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>{" "}
        </Typography>
        <Typography>
          Coordenadas: x = {selectedElement?.position.x} ; y =
          {" " + selectedElement?.position.y}
        </Typography>
      </Box>
      <div ref={reactFlowWrapper} style={{width: '100%', height: '100%'}}>
        <ReactFlow
          elements={elements}
          paneMoveable={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          onLoad={setRfInstance}
          onConnect={onConnect}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Controls />
        </ReactFlow>
      </div>
  
    </>
  );
}

const options = [
  {
    name: "Switch Core XXX",
  },
  {
    name: "Switch Ger. XXX",
  },
  {
    name: "Switch ToR",
  },
  {
    name: "Rack XYZ",
  },
];

const getNodeId = () => `randomNode_${+new Date()}`;

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div onDragStart={(event) => onDragStart(event, "input")} draggable>
        Nó de entrada
      </div>
      <div onDragStart={(event) => onDragStart(event, "default")} draggable>
        Nó padrão
      </div>
      <div onDragStart={(event) => onDragStart(event, "output")} draggable>
        Nó de saída
      </div>
    </aside>
  );
};
