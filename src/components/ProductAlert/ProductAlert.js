import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import '../../assets/styles/ProductAlert.scss'

function ProductAlert({ showAlert, setShowAlert, errorAlert, setErrorAlert }) {

  // useEffect(() => {
  //   if (showAlert || errorAlert) {
  //     const timer = setTimeout(() => {

  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showAlert, errorAlert]);

  return (
    <>
      <div className="alert-container">
        <Stack
          className={!showAlert ? 'alert_action' : ''}
          sx={{
            width: '20%',
            position: 'fixed',
            bottom: '3%',
            right: 0,
            transition: '0.3s',
          }}
          spacing={2}
        >
          <Alert onClose={() => setShowAlert(!showAlert)}>The product has been added to the cart</Alert>
        </Stack>
      </div>
      <div className="alert-container">
        <Stack
          className={!errorAlert ? 'alert_action' : ''}
          sx={{
            width: '20%',
            position: 'fixed',
            bottom: '3%',
            right: 0,
            transition: '0.3s'
          }}
          spacing={2}
        >
          <Alert severity="error" onClose={() => setErrorAlert(!showAlert)}>
            <AlertTitle>This product is already in your basket.</AlertTitle>
          </Alert>
        </Stack>
      </div>
    </>
  );
}

export default ProductAlert;
