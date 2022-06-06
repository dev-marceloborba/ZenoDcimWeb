import React from "react";
import { Routes, Route } from "react-router-dom";
import ZenoHome from "modules/home/pages/zeno-home/ZenoHome";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ZenoHome />} />
    </Routes>
  );
};

export default HomeRoutes;
