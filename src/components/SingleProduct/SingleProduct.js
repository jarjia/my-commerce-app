import React, {useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card, CardMedia, CardContent, Typography} from '@mui/material'
import './styles.css'

const SingleProduct = ({products, handleAddToCart}) => {
  const [add, setAdd] = useState(0);
  const [related, setRelated] = useState(false)
  const [desc, setDesc] = useState(1)
  const { productId } = useParams();

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  const product = products.find(item => `:${item.id}` === productId)
  let price = parseFloat(product.price.formatted.replace(/,/g, ''))

  const formatOperand = (operand) => {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

  const handleIncrease = () => {
    const {available} = product.inventory
    setAdd(prev => {
      if(prev === '') {
        return prev === 0
      }else if(prev === available || available === 0) {
        return prev = available
      }else if(prev > available){
        return prev = available
      }else {
        return prev + 1
      }
    })
  }

  const handleDecrease = () => {
    setAdd(prev => {
      if(prev === 0) {
        return prev = 0
      }else if(prev <= 0){
        return prev = 0
      }else {
        return prev - 1
      }
    })
  }

  const handleRelatedProducts = () => {
    setRelated(prev => !prev)
  }

  const handleGoToDesc = () => {
    setDesc(prev => prev + 1)
  }

  const handleGoToMain = () => {
    setDesc(prev => prev - 1)
  }

  const handleOnchange = (event) => {
    const {value} = event.target
    const {available} = product.inventory
    setAdd(prev => {
      if(value > available) {
        return prev = available
      }else if(value < 0){
        return prev = 0
      }else if(value === 0){
        return value === 0
      }else {
        return prev = value
      }
    })
  }

  return (
    <Card className='root'>
      <CardMedia  className='media' image={product.image.url} alt={product.name} title={product.name}/>
      <CardContent  className='card-content'>
        <div className='header'>
          <Typography variant='h4'>{product.name}</Typography>
          <div className='link-list'>
            <ul className='ul'>
              <button className='list-btn' onClick={handleRelatedProducts}>
                Explore Related Products
                <KeyboardArrowUpIcon className={related ? `arrow` : `arrow-rotate`}/>
              </button>
              <div style={{
                display: related ? 'block' : 'none',
              }}>
                {product.related_products.length === 0 ? <div className='no-related'>No Related Products</div> : product.related_products.map(item => {
                  return <Button key={item.id} component={Link} to={`/:${item.id}`} className='link' onClick={handleRelatedProducts}>
                    {item.name}
                  </Button>
                })}
              </div>
            </ul>
          </div>
        </div>
        {desc === 1 ? <div className='first-page'>
          <Typography variant='h6' className='desc'>Description: <button className='desc-link' onClick={handleGoToDesc}><i>See The Description</i></button></Typography>
          <Typography variant='h6' className='price'>Price: <span style={{color: '#1976d2', fontSize: '20px', marginLeft: '5px'}}>{product.price.formatted_with_symbol}</span></Typography>
          <Typography variant='h6' className='available'>Available: <span style={{color: '#1976d2'}}>{product.inventory.available}</span></Typography>
          <div className='btn-div'>
            quantity: 
            <Button className='digits' type="button" onClick={handleDecrease} style={{
              maxWidth: "60px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "20px"
            }}>-</Button>
            <input type='number' className='inp' value={add} onChange={handleOnchange} autoComplete='off'/>
            <Button className='digits' type="button" onClick={handleIncrease} style={{
              maxWidth: "60px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "20px"
            }}>+</Button>
          </div>
          <Typography variant='h5' color='primary'>Subtotal: <span className='subtotal-price'>${formatOperand(String(add * price))}</span></Typography>
          <Button style={{margin: '35px 0 5px 0', width: '100%'}} variant="contained" type="button" color="primary" onClick={
            add > 0 ? () => handleAddToCart(product.id, add) : undefined
          }>Add to Cart</Button>
          <div className='link-btns'>
            <Button className='custom-btn' component={Link} to='/cart' variant="contained" type="button">go to cart</Button>
            <Button style={{margin: '5px 0 5px 0', width: '100%'}} component={Link} to='/' variant="contained" color='secondary' type="button">go back</Button>
          </div>
        </div> :
        <div className='desc-page'>
          <div className='desc-div'>
            <Typography variant='h4' className='desc'>Description</Typography>
            <Typography variant='body1' className='description' color='textprimary' dangerouslySetInnerHTML={{__html: product.description }}></Typography>
            <button className='desc-link' onClick={handleGoToMain}><i>Go Back</i></button>
          </div>
        </div>}
      </CardContent>
    </Card>
  )
}

export default SingleProduct