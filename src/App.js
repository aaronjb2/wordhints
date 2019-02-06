import React, { Component } from 'react';
import {Provider,connect} from 'react-redux';
import store from './dux/store.js'
import Whole from './components/Whole/Whole.js';
import axios from 'axios';
import './App.css';

class App extends Component {
constructor(props){
  super(props);


}



  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Whole></Whole>
        </div>
      </Provider>
    );
  }
}

export default App
