import React from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './pages/Pages';
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";

function App() {

  return (
    <div className="App">
      <Header/>
      <Pages/>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
