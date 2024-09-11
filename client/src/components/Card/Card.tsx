import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard({name, id, price}) {
  return (
    <Card sx={{ width: 250, height: 250 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          ID: {id}
        </Typography>
        <Typography variant="h5" component="div">
          Name: {name}
        </Typography>
        <Typography variant="body2">
          Price: {price}
        </Typography>
      </CardContent>
    </Card>
  );
}
