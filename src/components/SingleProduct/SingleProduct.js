import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { Card, CardMedia, CardContent, Typography} from '@mui/material'
import './styles.css'

const SingleProduct = ({products, handleAddToCart}) => {
  const [add, setAdd] = useState(1);
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(item => `:${item.id}` === productId)
  let price = parseFloat(product.price.formatted.replace(/,/g, ''))

  console.log(products);

  const handleIncrease = () => {
    setAdd(prev => {
      if(prev === product.inventory.available) {
        return prev = product.inventory.available
      }else {
        return prev + 1
      }
    })
  }

  const handleDecrease = () => {
    setAdd(prev => {
      if(prev === 1) {
        return prev = 1
      }else {
        return prev - 1
      }
    })
  }


  return (
    <Card className='root'>
      <CardMedia  className='media' image={product.image.url} alt={product.name} title={product.name}/>
      <CardContent  className='card-content'>
        <Typography variant='h4' className='name'>{product.name}</Typography>
        <div className='desc-div'>
          <Typography variant='h6' className='desc'>Description: </Typography>
          <Typography variant='body1' className='description' color='textprimary' dangerouslySetInnerHTML={{__html: product.description }}></Typography>
        </div>
        <Typography variant='h6' className='price'>Price: <span style={{color: '#1976d2', fontSize: '20px', marginLeft: '5px'}}>{product.price.formatted_with_symbol}</span></Typography>
        <Typography variant='h6' className='available'>Available: <span style={{color: '#1976d2'}}>{product.inventory.available}</span></Typography>
        <div className='btn-div'>
          quantity:
          <Button type="button" size="small" onClick={handleDecrease}>-</Button>
          <span className='quantity'>{add}</span>
          <Button type="button" size="small" onClick={handleIncrease}>+</Button>
        </div>
        <Typography variant='h5' color='primary'>Subtotal: <span className='subtotal-price'>${add * price}</span></Typography>
        <Button style={{margin: '45px 0 20px 0', width: '100%'}} variant="contained" type="button" color="primary" onClick={() => handleAddToCart(product.id, add)}>Add to Cart</Button>
        <Button style={{width: '100%'}} component={Link} to='/' variant="contained" type="button">go back</Button>
      </CardContent>
    </Card>
  )
}

export default SingleProduct