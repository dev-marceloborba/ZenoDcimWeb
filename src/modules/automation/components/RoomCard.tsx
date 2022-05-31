import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

type RoomCardProps = {
    title: string;
  };
  
  const RoomCard: React.FC<RoomCardProps> = ({ title, children }) => {
    return (
      <Card sx={{ p: 1 }}>
        <Typography variant="h6">{title}</Typography>
        {children}
      </Card>
    );
  };

export default RoomCard