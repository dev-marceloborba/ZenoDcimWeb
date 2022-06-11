import React from "react";
import { Routes, Route } from "react-router-dom";
import CamerasList from "../pages/cameras-list/CamerasList";

const CamerasRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<CamerasList />} />
    </Routes>
  );
};

export default CamerasRoutes;
