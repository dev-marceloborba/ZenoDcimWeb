import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

type TabProps = {
  mode?: "vertical" | "horizontal";
  tabItems: TabItem[];
};

type TabItem = {
  element: React.ReactNode;
  title: string;
  content?: React.ReactNode;
  visible?: boolean;
};

const Tabs: React.FC<TabProps> = ({ mode = "horizontal", tabItems }) => {
  const [value, setValue] = useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getContent = (content: React.ReactNode, index: number) => {
    if (content && index.toString() === value) {
      return <>{content}</>;
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
            {tabItems.map(({ title, visible }, idx) => {
              const isAllowed = visible === undefined || visible === true;
              return isAllowed ? (
                <Tab key={idx} label={title} value={idx.toString()} />
              ) : null;
            })}
          </TabList>
          {tabItems.map(({ content }, idx) => {
            const element = getContent(content, idx);
            return element;
          })}
        </Stack>
        {tabItems.map(({ element }, idx) => (
          <TabPanel key={idx} value={idx.toString()}>
            {element}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Tabs;
