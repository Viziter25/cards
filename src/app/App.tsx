import React, {useEffect} from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './pages/Pages';
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./store";
import {authMeTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";

function App() {

  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
  
  return (
    <div className="App">
      <Header/>
      <Pages/>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
