import { useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ReactFlow, {
  addEdge,
  removeElements,
  useZoomPanHelper,
  Controls,
} from "react-flow-renderer";

import PageTitle from "app/components/PageTitle";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { modalStyle } from "app/styles/modal-style";

const FlowDiagramEditor = () => {
  const [rfInstance, setRfInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementBackgroundColor, setElementBackgroundColor] = useState("white");
  const [openDiagramNameModal, setOpenDiagramNameModal] = useState(false);
  const [openSavedDiagramListModal, setOpenSavedDiagramListModal] =
    useState(false);
  const { transform } = useZoomPanHelper();

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onElementClick = (event, element) => {
    console.log(element)
    console.log(event)
    const { style} = element
    console.log(style)

    const elementInArrayOfElements = elements.find((x) => x.id === element.id)
    
    console.log(elementInArrayOfElements)
    // setSelectedElement(element);
    setSelectedElement(elementInArrayOfElements)
  }

  const onDrop = (event) => {
    function getNodeDescription(type) {
      switch (type) {
        case "input":
          return "Nó de entrada";
        case "default":
          return "Nó padrão";
        case "output":
          return "Nó de saída";
        default:
          return "";
      }
    }

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
        // label: `${type} node`,
        label: getNodeDescription(type),
      },
      ...(type === "input" && {
        sourcePosition: "right",
      }),
      ...(type === "default" && {
        sourcePosition: "right",
        targetPosition: "left",
      }),
      ...(type === "output" && {
        targetPosition: "left",
      }),
      style: {
        backgroundColor: elementBackgroundColor,
      },
    };
    setElements((els) => els.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onSave = useCallback(() => {
    setOpenDiagramNameModal(true);
  }, [setOpenDiagramNameModal]);

  const onRestore = (diagram) => {
    const restoreFlow = () => {
      const flow = JSON.parse(localStorage.getItem(diagram.key));
      if (flow) {
        console.log(flow);
        const [x, y] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };
    restoreFlow();
  };

  const onNewDiagram = () => {
    setElements([]);
  };

  const onEditSystem = (event) => {
    const elementsCpy = [...elements];
    elementsCpy.forEach((node) => {
      if (node?.data?.label === selectedElement?.data.label) {
        node.data.label = event.target.value;
      }
    });
    setElements(elementsCpy);
  };

  const onChangeColor = (event) =>
    setElementBackgroundColor(event.target.value);

  const onCloseDiagramNameModal = () => setOpenDiagramNameModal(false);

  const onDiagramTitleSave = (title) => {
    if (rfInstance && !!title) {
      const flow = rfInstance.toObject();
      localStorage.setItem(`flow_${title}`, JSON.stringify(flow));
    }

    onCloseDiagramNameModal();
  };

  const onCloseSavedDiagramListModal = () => {
    setOpenSavedDiagramListModal(false);
  };

  const onOpenSavevDiagramListModal = () => {
    setOpenSavedDiagramListModal(true);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Toolbar />
      <PageTitle>Editor de diagramas</PageTitle>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Button variant="contained" onClick={onNewDiagram}>
          Novo
        </Button>
        <Button variant="contained" sx={{ ml: 1 }} onClick={onSave}>
          Salvar
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 1 }}
          onClick={onOpenSavevDiagramListModal}
        >
          Pesquisar
        </Button>
      </Box>
      <Box
        ref={reactFlowWrapper}
        sx={{
          mt: 1,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          // backgroundColor: "#ddd",
          p: 2,
          // display: 'flex'
        }}
      >
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h5">Area de edição</Typography>

        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "80%",
              // height: "100%",
              backgroundColor: "green",
            }}
          >
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementClick={onElementClick}
              onElementsRemove={onElementsRemove}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onLoad={setRfInstance}
              paneMoveable={false}
              zoomOnScroll={true}
              zoomOnDoubleClick={false}
            >
              <Controls />
            </ReactFlow>
          </Box>
          <Sidebar
            elementBackgroundColor={elementBackgroundColor}
            selectedElement={selectedElement}
            onEditSystem={onEditSystem}
            onChangeColor={onChangeColor}
          />
        </Box>
      </Box>
      <FlowDiagramNameModal
        open={openDiagramNameModal}
        onClose={onCloseDiagramNameModal}
        onSave={onDiagramTitleSave}
      />
      <SavedDiagramsListModal
        open={openSavedDiagramListModal}
        onClose={onCloseSavedDiagramListModal}
        onLoad={onRestore}
      />
    </Container>
  );
};

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

const getNodeId = () => `node_${+new Date()}`;

export default FlowDiagramEditor;

const Sidebar = ({
  selectedElement,
  onEditSystem,
  onChangeColor,
  elementBackgroundColor,
}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderLeft: "1px solid #eee",
        padding: "15px 10px",
        fontSize: "12px",
        width: "20%",
        // height: "100vh",
        // maxWidth: "240px",
      }}
    >
      <Typography
        sx={{ alignSelf: "flex-start", padding: "4px 12px" }}
        variant="h6"
      >
        Nós
      </Typography>
      <Box
        sx={{ cursor: "grab" }}
        className="react-flow__node-input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Nó de entrada
      </Box>
      <Box
        sx={{ mt: 1, cursor: "grab" }}
        className="react-flow__node-default"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Nó padrão
      </Box>
      <Box
        sx={{ mt: 1, cursor: "grab" }}
        className="react-flow__node-output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Nó de saída
      </Box>
      <Typography
        sx={{ alignSelf: "flex-start", padding: "4px 12px", mt: 2 }}
        variant="h6"
      >
        Elemento selecionado
      </Typography>
      <Typography>Id: {selectedElement?.id}</Typography>
      <Typography>
        Descrição:{" "}
        <TextField
          fullWidth
          color="primary"
          variant="outlined"
          select
          value={selectedElement?.data.label ?? ""}
          onChange={onEditSystem}
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
      <ElementColorSelection
        value={elementBackgroundColor}
        onChangeColor={onChangeColor}
      />
    </aside>
  );
};

const ElementColorSelection = ({ value, handleOnChange }) => {
  return (
    <TextField select defaultValue="" value={value} onChange={handleOnChange}>
      <MenuItem value={"yellow"}>
        <ColorWithDescription
          colorDescription={"Amarelo"}
          backgroundColor={"yellow"}
        />
      </MenuItem>
      <MenuItem value={"blue"}>
        <ColorWithDescription
          colorDescription={"Azul"}
          backgroundColor={"blue"}
        />
      </MenuItem>
      <MenuItem value={"red"}>
        <ColorWithDescription
          colorDescription={"Vermelho"}
          backgroundColor={"red"}
        />
      </MenuItem>
      <MenuItem value={"green"}>
        <ColorWithDescription
          colorDescription={"Verde"}
          backgroundColor={"green"}
        />
      </MenuItem>
      <MenuItem value={"orange"}>
        <ColorWithDescription
          colorDescription={"Laranja"}
          backgroundColor={"orange"}
        />
      </MenuItem>
      <MenuItem value={"white"}>
        <ColorWithDescription
          colorDescription={"Branco"}
          backgroundColor={"white"}
        />
      </MenuItem>
    </TextField>
  );
};

const ColorWithDescription = ({ colorDescription, backgroundColor }) => {
  const renderColorSquare = () => {
    return <Box sx={{ width: 16, height: 16, backgroundColor }} />;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {renderColorSquare()}
      <Typography sx={{ ml: "0.4rem" }}>{colorDescription}</Typography>
    </Box>
  );
};

const FlowDiagramNameModal = ({ open, onClose, onSave }) => {
  const textFieldRef = useRef(null);

  const handleOnSave = () => {
    onSave(textFieldRef.current.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Novo diagrama</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Entre com um nome para salvar o diagrama criado.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome do diagrama"
          type="text"
          fullWidth
          variant="standard"
          inputRef={textFieldRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleOnSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

const SavedDiagramsListModal = ({ open, onClose, onLoad }) => {
  const diagrams = [
    {
      key: "flow_test",
      text: "Diagrama 1",
    },
    {
      key: "flow_test2",
      text: "Diagrama 2",
    },
  ];

  const handleItemClick = (diagram) => {
    onLoad(diagram);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" sx={{ pb: 1 }}>
          Escolha um diagrama abaixo
        </Typography>
        <Divider />
        <List>
          {diagrams.map((diagram, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => handleItemClick(diagram)}>
                <ListItemText primary={diagram.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};
