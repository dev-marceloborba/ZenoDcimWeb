import MuiMenu, { MenuProps as MuiMenuProps } from "@mui/material/Menu";

type MenuProps = {} & MuiMenuProps;

const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
  return (
    <MuiMenu
      keepMounted
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    >
      {children}
    </MuiMenu>
  );
};

export default Menu;
