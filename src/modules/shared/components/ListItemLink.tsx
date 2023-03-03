import React, { useState } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SxProps, Theme } from "@mui/system";
import { Collapse } from "@mui/material";
import { GroupModel } from "modules/user/models/group.model";

type ListItemChildrenProps = {
  primary: string;
  sx?: SxProps<Theme>;
  to?: string;
  validatePermission?(permissions: GroupModel): boolean;
};

export type ListItemLinkProps = ListItemChildrenProps & {
  icon?: React.ReactElement;
  items?: ListItemChildrenProps[];
  nested?: boolean;
};

const AlternativeListItemLink: React.FC<ListItemLinkProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { pathname } = useLocation();
  const { items, to, icon, primary, nested } = props;

  const handleToggleExpanded = () => setExpanded(!expanded);

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink
              to={to ?? ""}
              ref={ref}
              {...itemProps}
              role={undefined}
            />
          );
        }
      ),
    [to]
  );
  return (
    <>
      <ListItem
        button
        {...(!nested && { onClick: handleToggleExpanded })}
        {...(!items && { component: renderLink })}
        {...(to && { selected: pathname.includes(to) })}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={primary}
          sx={{
            "& .MuiTypography-root": {
              fontSize: nested ? "0.875rem" : "1rem",
            },
          }}
        />
        {items && (
          <ExpandMoreIcon
            sx={{
              transform: `rotate(${expanded ? 180 : 0}deg)`,
              transition: "all 200ms ease-in",
            }}
          />
        )}
      </ListItem>

      {items && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {items.map((item) => (
              <AlternativeListItemLink
                key={item.primary}
                {...item}
                icon={<></>}
                nested
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default AlternativeListItemLink;
