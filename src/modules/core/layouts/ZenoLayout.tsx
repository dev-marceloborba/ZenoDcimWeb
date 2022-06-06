import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import withAuthentication from "app/hocs/withAuthentication";
import Header from "app/components/Header";
import Sidenav from "app/components/Sidenav";
import { LayoutProvider } from "app/hooks/useLayout";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Footer from "app/components/Footer";

const ZenoLayout: React.FC = () => {
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
          {/* <SubRoutes /> */}
          <Outlet />
        </Box>
      </Box>
      {/* <Footer /> */}
    </LayoutProvider>
  );
};

// export default withAuthentication(ZenoLayout);
export default ZenoLayout;
