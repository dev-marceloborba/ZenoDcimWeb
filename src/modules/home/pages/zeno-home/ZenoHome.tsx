import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import withAuthentication from "app/hocs/withAuthentication";
import Header from "modules/home/components/header/Header";
import Sidenav from "modules/home/components/sidenav/Sidenav";
import { LayoutProvider } from "app/hooks/useLayout";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Footer from "modules/shared/components/Footer";
import { useFindUserByIdMutation } from "modules/user/services/authentication-service";
import Loading from "modules/shared/components/Loading";
import { useAppDispatch } from "app/hooks";
import { useAuth } from "app/hooks/useAuth";
import { setPreferences } from "modules/user/stores/slices/AuthenticationSlice";

const ZenoHome: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [findUser, { isLoading }] = useFindUserByIdMutation();
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUser() {
      const user = await findUser(currentUser?.id ?? "").unwrap();
      if (user.userPreferencies) {
        dispatch(setPreferences(user.userPreferencies));
      }
    }
    fetchUser();
  }, [currentUser?.id, dispatch, findUser]);

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
      <Loading open={isLoading} />
    </LayoutProvider>
  );
};

// export default withAuthentication(ZenoHome);
export default ZenoHome;
