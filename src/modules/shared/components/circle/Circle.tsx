import Box, { BoxProps } from "@mui/material/Box";

type CircleProps = {
  radius: number;
} & BoxProps;

const Circle: React.FC<CircleProps> = ({ children, radius, ...props }) => {
  return (
    <Box {...props} borderRadius="100%" width={radius} height={radius}>
      {children}
    </Box>
  );
};

export default Circle;
