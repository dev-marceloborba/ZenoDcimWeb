import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import withAuthentication from "app/hocs/withAuthentication";
import Header from "modules/home/components/Header";
import Sidenav from "modules/home/components/Sidenav";
import { LayoutProvider } from "app/hooks/useLayout";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Footer from "modules/shared/components/Footer";

const ZenoHome: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <LayoutProvider>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Header />
        <Sidenav />
        <Box
          component="div"
          sx={{
            mt: "4rem",
            ml: matches ? "220px" : "0px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {/* <Footer /> */}
    </LayoutProvider>
  );
};

// export default withAuthentication(ZenoHome);
export default ZenoHome;
