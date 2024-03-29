import React, {useState, useEffect} from 'react'
import { Products, Navbar, Cart, Checkout, SingleProduct} from './components'
import {commerce} from './lib/Commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [errorMessage, setErrorMessage] = useState('');
  const [order, setOrder] = useState({});

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();

    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateProduct = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity})

    setCart(cart)
  }

  const handleRemoveProduct = async (productId) => {
    const {cart} = await commerce.cart.remove(productId)

    setCart(cart)
  }

  const handleEmptyProduct = async () => {
    const {cart} = await commerce.cart.empty();

    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);

      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])
  
  return (
      <Router>
          <Navbar products={products} totalCart={cart.total_items}/>
          <Routes>
            <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
            <Route path='/:productId' element={<SingleProduct products={products} handleAddToCart={handleAddToCart}/>}/>
            <Route path='/cart' element={<Cart 
                cart={cart}
                handleUpdateProduct={handleUpdateProduct}
                handleRemoveProduct={handleRemoveProduct}
                handleEmptyProduct={handleEmptyProduct}
              />} 
            />
            <Route path='/checkout' element={
              <Checkout cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
            }/>
          </Routes>
      </Router>
  );
}

export default App 