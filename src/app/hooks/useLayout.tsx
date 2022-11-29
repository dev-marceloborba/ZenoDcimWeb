import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type LayoutContextData = {
  toggleDrawer(): void;
  showMenuButton: boolean;
  drawerOpened: boolean;
  isMobile: boolean;
};

type DrawerStateType = {
  showMenuButton: boolean;
  drawerOpened: boolean;
  isMobile: boolean;
};

const LayoutContext = createContext<LayoutContextData>({
  isMobile: false,
  drawerOpened: true,
} as LayoutContextData);

export const LayoutProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerState, setDrawerState] = useState<DrawerStateType>({
    drawerOpened: true,
    isMobile: false,
  } as DrawerStateType);

  useEffect(() => {
    setDrawerState((prevState) => ({
      ...prevState,
      isMobile: matches,
      drawerOpened: matches ? false : true,
    }));
  }, [matches]);

  const toggleDrawer = useCallback(() => {
    setDrawerState((prevState) => ({
      ...prevState,
      drawerOpened: !prevState.drawerOpened,
    }));
  }, []);

  return (
    <LayoutContext.Provider value={{ toggleDrawer, ...drawerState }}>
      {children}
    </LayoutContext.Provider>
  );
};

export function useLayout() {
  return useContext(LayoutContext);
}
