import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import { useTabContext } from "./TabContext";

type LabelTabsProps = {
  sx?: SxProps<Theme>;
  items: string[];
};

const LabelTabs: React.FC<LabelTabsProps> = ({ children, ...props }) => {
  const { onChangeTabIndex, tabIndex } = useTabContext();

  if (children) {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tabs value={tabIndex} onChange={onChangeTabIndex} sx={props.sx}>
          {props.items.map((item, index) => (
            <Tab key={index} label={item} />
          ))}
        </Tabs>
        {children}
      </Stack>
    );
  }

  return (
    <Tabs value={tabIndex} onChange={onChangeTabIndex} sx={props.sx}>
      {props.items.map((item, index) => (
        <Tab key={index} label={item} />
      ))}
    </Tabs>
  );
};

export default LabelTabs;
