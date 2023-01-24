import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, CircularProgress } from '@material-ui/core';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card, CardMedia, CardContent, Typography} from '@mui/material'
import './styles.css'
import {commerce} from "../../lib/Commerce"

const SingleProduct = ({products, handleAddToCart}) => {
  const [add, setAdd] = useState(0);
  const [related, setRelated] = useState(false)
  const [desc, setDesc] = useState(1)
  const [data, setData] = useState();
  
  const { productId } = useParams();

  useEffect(() => {
    commerce.products.list({
      query: productId,
    }).then(response => setData(response.data[0]));
  }, [productId])

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })

  let price = data && parseFloat(data.price.formatted.replace(/,/g, ''))

  const formatOperand = (operand) => {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

  const handleIncrease = () => {
    const {available} = data.inventory
    setAdd(prev => {
      let num = parseFloat(prev)
      if(num === available || available === 0) {
        return num = available
      }else if(num > available){
        return num = available
      }else {
        return num + 1
      }
    })
  }

  const handleDecrease = () => {
    setAdd(prev => {
     if(prev <= 0){
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
    const {available} = data.inventory
    setAdd(prev => {
      if(value > available) {
        return prev = available
      }else if(value < 0) {
        return prev = 0
      }else if(value === '') {
        return prev = 0
      }else if(value.split('')[0] === '0') {
        let val = value.split('')[0].slice(0, -1) + value.split('')[1]
        return prev = val
      }else {
        return prev = value
      }
    })
  }

  return (
    <Card className={`root ${data ? '' : 'root-1'}`}>
      {data ? <>
      <CardMedia className='media' image={data.image.url} alt={data.name} title={data.name}/>
      <CardContent  className='card-content'>
        <div className='header'>
          <Typography variant='h4'>{data.name}</Typography>
          <div className='link-list'>
            <ul className='ul'>
              <button className='list-btn' onClick={handleRelatedProducts}>
                Explore Related Products
                <KeyboardArrowUpIcon className={related ? `arrow` : `arrow-rotate`}/>
              </button>
              <div style={{
                display: related ? 'block' : 'none',
              }}>
                {data.related_products.length === 0 ? <div className='no-related'>No Related Products</div> : data.related_products.map(item => {
                  return <Button key={item.id} component={Link} to={`/:${item.id}`} className='link' onClick={() => {
                    handleRelatedProducts()
                    setAdd(0)
                  }}>
                    {item.name}
                  </Button>
                })}
              </div>
            </ul>
          </div>
        </div>
        {desc === 1 ? <div className='first-page'>
          <Typography variant='h6' className='desc'>Description: <button className='desc-link' onClick={handleGoToDesc}><i>See The Description</i></button></Typography>
          <Typography variant='h6' className='price'>Price: <span style={{color: '#1976d2', fontSize: '20px', marginLeft: '5px'}}>{data.price.formatted_with_symbol}</span></Typography>
          <Typography variant='h6' className='available'>Available: <span style={{color: '#1976d2'}}>{data.inventory.available}</span></Typography>
          <div className='btn-div'>
            quantity: 
            <Button className='digits' type="button" onClick={handleDecrease} style={{
              maxWidth: "60px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "20px"
            }}>-</Button>
            <input type='number' placeholder='0' className='inp' value={add} onChange={handleOnchange} autoComplete='off'/>
            <Button className='digits' type="button" onClick={handleIncrease} style={{
              maxWidth: "60px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "20px"
            }}>+</Button>
          </div>
          <Typography variant='h5' color='primary'>Subtotal: <span className='subtotal-price'>${formatOperand(String(add * price))}</span></Typography>
          <Button style={{margin: '35px 0 5px 0', width: '100%'}} variant="contained" type="button" color="primary" onClick={
            add > 0 ? () => handleAddToCart(data.id, add) : undefined
          }>Add to Cart</Button>
          <div className='link-btns'>
            <Button className='custom-btn' component={Link} to='/cart' variant="contained" type="button">go to cart</Button>
            <Button style={{margin: '5px 0 5px 0', width: '100%'}} component={Link} to='/' variant="contained" color='secondary' type="button">go back</Button>
          </div>
        </div> :
        <div className='desc-page'>
          <div className='desc-div'>
            <Typography variant='h4' className='desc'>Description</Typography>
            <Typography variant='body1' className='description' color='textprimary' dangerouslySetInnerHTML={{__html: data.description }}></Typography>
            <button className='desc-link' onClick={handleGoToMain}><i>Go Back</i></button>
          </div>
        </div>}
      </CardContent> </> : <div className='loading'>
        <CircularProgress />
      </div>}
    </Card>
  )
}

export default SingleProduct