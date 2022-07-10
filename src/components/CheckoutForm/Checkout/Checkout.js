import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../../lib/Commerce';
import useStyles from './styles'
import AddressFrom from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, error, handleCaptureCheckout, order}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [checkoutToken, setCheckoutToken] = useState(null)
  const classes = useStyles();
  const navigate = useNavigate();

  const nextStep = () => setActiveStep(prev => prev + 1)
  const backStep = () => setActiveStep(prev => prev - 1)
  
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})

        setCheckoutToken(token)
      } catch (error) {
        if (activeStep !== steps.length) navigate('/');
      }
    }
    generateToken()
  }, [cart, activeStep, navigate])

  const test = (data) => {
    setShippingData(data)

    nextStep()
  }

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0 
    ? <AddressFrom checkoutToken={checkoutToken} setShippingData={setShippingData} test={test}/> 
    : <PaymentForm shippingData={shippingData} nextStep={nextStep} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} checkoutToken={checkoutToken}/>);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
          ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout 