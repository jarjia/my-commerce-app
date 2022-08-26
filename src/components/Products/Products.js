import React from 'react'
import { Grid } from '@mui/material'
import Product from './Product/Product'
import useStyles from './styles'

const Products = ({products, onAddToCart}) => {
    const classes = useStyles();
  return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justify='center' spacing={4}>
            {products.map(item => {
                return <Grid item key={item.id} xs={12} sm={6} md={6} lg={4}>
                    <Product product={item} onAddToCart={onAddToCart}/>
                </Grid>
            })}
        </Grid>
    </main>
  )
}

export default Products;