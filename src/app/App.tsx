import React, {useEffect} from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './pages/Pages';
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch} from "./store";
import {authMeTC} from "../features/Login/auth-reducer";

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])
  
  return (
    <div className="App">
      <Header/>
      <Pages/>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
