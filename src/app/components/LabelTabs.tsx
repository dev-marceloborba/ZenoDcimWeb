import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SxProps, Theme } from "@mui/material";
import { useTabContext } from "./TabContext";

type LabelTabsProps = {
  sx?: SxProps<Theme>;
  items: string[];
};

const LabelTabs: React.FC<LabelTabsProps> = ({ ...props }) => {
  const { onChangeTabIndex, tabIndex } = useTabContext();

  return (
    <Tabs value={tabIndex} onChange={onChangeTabIndex} sx={props.sx}>
      {props.items.map((item, index) => (
        <Tab key={index} label={item} />
      ))}
    </Tabs>
  );
};

export default LabelTabs;
