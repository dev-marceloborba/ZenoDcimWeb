import React, { useState, useContext, createContext } from "react";

type TabContextProps = {
  tabIndex: number;
  onChangeTabIndex: (event: React.SyntheticEvent, newValue: number) => void;
};

const TabContext = createContext<TabContextProps>({} as TabContextProps);

const TabContextProvider: React.FC = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const onChangeTabIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <TabContext.Provider
      value={{
        tabIndex,
        onChangeTabIndex,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

const useTabContext = () => useContext(TabContext);

export { TabContext, TabContextProvider, useTabContext };
