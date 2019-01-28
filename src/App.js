import React, { Component } from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Content from './components/content.component';

class App extends Component {
  render() {
    return (
      <div className="container">
      <center><h2>The World's Leading Cryptocurrency Trading Platform</h2></center>
      <br /><br />
      <Route path="/" component={ Content } />
      </div>
    );
  }
}
export default App;