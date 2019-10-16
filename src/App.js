import React from 'react';
import './App.scss';
import 'bulma';
import Timer from './components/timer';


function App(){
  return (
    <div className="App">
      <div className="container">
        <Timer />
      </div>
    </div>
  );
}

export default (App);
