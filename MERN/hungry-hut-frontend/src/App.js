import { ThemeProvider } from '@emotion/react';
import './App.css';
import { darkTheme } from './theme/DarkTheme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './state/Authentication/Action';
import { findCart } from './state/Cart/Action';
import { ToastContainer } from 'react-toastify';
import Routers from './Routers/Routers';
import { getRestaurantByUserId } from './state/Restaurant/Action';

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector(store=>store.auth);

  useEffect(() => {
    if(auth.jwt){
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
    }
  },[auth.jwt, dispatch, jwt])

  useEffect(()=>{
    if(auth.jwt)
      dispatch(getRestaurantByUserId(auth.jwt||jwt));
  },[auth.jwt,dispatch,jwt])

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routers />
        <ToastContainer position="top-right" />
    </ThemeProvider>
  );
}

export default App;
