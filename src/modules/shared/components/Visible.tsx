import React from "react";

type VisibleProps = {
  show: boolean;
};

const Visible: React.FC<VisibleProps> = ({ show, children }) => {
  if (show) {
    return <>{children}</>;
  }
  return null;
};

export default Visible;
