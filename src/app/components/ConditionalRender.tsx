import React from "react";

type ConditionalRenderProps = {
  condition: boolean;
  trueCondition: React.ReactNode;
  falseCondition: React.ReactNode;
};

function ConditionalRender(props: ConditionalRenderProps): any {
  const { condition, falseCondition, trueCondition } = props;
  if (condition) {
    return trueCondition;
  } else {
    return falseCondition;
  }
}

export default ConditionalRender;
