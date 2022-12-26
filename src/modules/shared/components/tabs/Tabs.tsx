import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

type TabProps = {
  mode: "vertical" | "horizontal";
  tabLabels: string[];
  tabItems: TabItem[];
};

type TabItem = {
  element: React.ReactNode;
  content?: React.ReactNode;
};

const Tabs: React.FC<TabProps> = ({ mode, tabLabels, tabItems, children }) => {
  const [value, setValue] = useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getContent = (item: TabItem, index: number) => {
    if (item.content && index.toString() === value) {
      return <>{item.content}</>;
    } else {
      return null;
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={mode === "horizontal" ? "row" : "column"}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <TabList onChange={handleChange}>
            {tabLabels.map((tabLabel, idx) => (
              <Tab key={idx} label={tabLabel} value={idx.toString()} />
            ))}
          </TabList>
          {tabItems.map((tabItem, idx) => {
            const content = getContent(tabItem, idx);
            return content;
          })}
        </Stack>
        {tabItems.map((tabItem, idx) => (
          <TabPanel key={idx} value={idx.toString()}>
            {tabItem.element}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Tabs;
