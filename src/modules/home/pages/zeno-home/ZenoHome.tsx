import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import withAuthentication from "app/hocs/withAuthentication";
import Header from "modules/home/components/header/Header";
import Sidenav from "modules/home/components/sidenav/Sidenav";
import { useLayout } from "app/hooks/useLayout";

import Footer from "modules/shared/components/Footer";
import { useFindUserByIdMutation } from "modules/user/services/authentication-service";
import Loading from "modules/shared/components/Loading";
import { useAppDispatch } from "app/hooks";
import { setPreferences } from "modules/user/stores/slices/AuthenticationSlice";
import { useAuth } from "app/hooks/useAuth";

const ZenoHome: React.FC = () => {
  const [findUser, { isLoading }] = useFindUserByIdMutation();
  const { drawerOpened } = useLayout();
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
    <>
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
            ml: drawerOpened ? "220px" : "0px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {/* <Footer /> */}
      <Loading open={isLoading} />
    </>
  );
};

// export default withAuthentication(ZenoHome);
export default ZenoHome;
