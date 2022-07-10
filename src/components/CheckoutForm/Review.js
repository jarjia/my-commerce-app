import React, {useState} from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';

const Review = ({checkoutToken}) => {
  const [hideProducts, setHideProducts] = useState(false)

  const handleHide = () => {
    setHideProducts(prevBool => !prevBool)
  }

  const styles = {
    display: hideProducts ? 'none' : 'block',
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      <List disablePadding>
        <div style={styles}>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="outlined" color="primary" onClick={handleHide}>{hideProducts ? 'Show Products' : 'Hide Products'}</Button>
        </div>
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText style={{fontSize: '1.25rem', fontWeight: 700, fontFamily: 'sans-serif'}} primary="Total:" disableTypography />
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review