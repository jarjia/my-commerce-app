import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';


import logo from '../../assets/commerce-1.png';
import useStyles from './styles';

const Navbar = ({totalCart, products}) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to='/' variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && <div className={classes.button}>
            <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
              <Badge overlap="rectangular" badgeContent={totalCart} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar