import React, { useState } from "react";
// import { useSelector } from "react-redux";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button, Card, CardContent, Collapse, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const initialBlocks = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  x: 0,
  y: index * 2,
  w: 6,
  h: 2,
  content: `Block ${index + 1}`
}));

const FundCompare = () => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [deletedBlocks, setDeletedBlocks] = useState([]);
  const [panelOpen, setPanelOpen] = useState(true);


  const removeBlock = (id) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.filter((block) => block.id !== id);
      const deleted = prevBlocks.find((block) => block.id === id);
      setDeletedBlocks((prevDeleted) => [...prevDeleted, deleted]);
      return updatedBlocks;
    });
  };

  const restoreBlock = (id) => {
    setDeletedBlocks((prevDeleted) => {
      const restored = prevDeleted.find((block) => block.id === id);
      setBlocks((prevBlocks) => [...prevBlocks, restored]);
      return prevDeleted.filter((block) => block.id !== id);
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 3, padding: 20, borderRight: "2px solid #ccc" }}>
        <h2>Drag & Drop Game</h2>
        <GridLayout
          className="layout"
          layout={blocks.map(({ id, x, y, w, h }) => ({ i: id.toString(), x, y, w, h }))}
          cols={2}
          rowHeight={50}
          width={600}
          onLayoutChange={(newLayout) => {
            setBlocks(
              newLayout.map((item) => ({
                id: parseInt(item.i),
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                content: blocks.find((block) => block.id === parseInt(item.i)).content
              }))
            );
          }}
        >
          {blocks.map((block) => (
            <div key={block.id} data-grid={{ x: block.x, y: block.y, w: block.w, h: block.h }}>
              <Card style={{ width: "100%" }}>
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{block.content}</span>
                    <Button size="small" onClick={() => removeBlock(block.id)}>X</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </GridLayout>
      </div>
      <div style={{ flex: 1, padding: 20 }}>
        <IconButton onClick={() => setPanelOpen(!panelOpen)} style={{ marginBottom: 10 }}>
          <SettingsIcon />
        </IconButton>
        <Collapse in={panelOpen}>
          <h2>Deleted Blocks</h2>
          {deletedBlocks.length > 0 ? (
            deletedBlocks.map((block) => (
              <Card key={block.id} style={{ marginBottom: 10, width: "100%" }}>
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{block.content}</span>
                    <Button size="small" onClick={() => restoreBlock(block.id)}>Restore</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No deleted blocks</p>
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default FundCompare;


