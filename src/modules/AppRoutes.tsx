import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./shared/components/Loading";
import UserRoot from "./user/UserRoot";
import HomeRoot from "./home/HomeRoot";

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading open={true} />}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<UserRoot />} />
          <Route path="zeno/*" element={<HomeRoot />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
