import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia, CssBaseline } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({item, handleUpdateProduct, handleRemoveProduct}) => {
    const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CssBaseline />
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
        <CardContent className={classes.cardContent}>
          <Typography variant='h5'>{item.name}</Typography>
          <Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button type="button" size="small" onClick={() => handleUpdateProduct(item.id, item.quantity - 1)}>-</Button>
            <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
            <Button type="button" size="small" onClick={() => handleUpdateProduct(item.id, item.quantity + 1)}>+</Button>
          </div>
          <div className={classes.removeBtn}>
            <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveProduct(item.id)}>Remove</Button>
          </div>
        </CardActions>
    </Card>
  )
}

export default CartItem