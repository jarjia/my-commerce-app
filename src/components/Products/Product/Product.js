import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@mui/material'
import { AddShoppingCart, ProductionQuantityLimits } from  '@mui/icons-material'
import { Link } from 'react-router-dom'
import useStyles from './styles'

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

    const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant='h5' gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant='h6' gutterBottom>
                    ${product.price.formatted}
                </Typography>
            </div>
            <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={{__html: product.description }}></Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='Show More'>
                <Link to={`/:${product.id}`} className={classes.link}>Show more</Link>
            </IconButton>
            <IconButton aria-label='Add to Cart'
                onClick={handleAddToCart}
            >
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product;