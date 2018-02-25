// import Draggable from 'react-draggable'; // Both at the same time
// NPM modules
import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Route, Link } from 'react-router-dom';
// Graphics
import Chart from 'react-icons/lib/md/insert-chart';
// Local files
import './App.css';
import { AddEquityForm } from './components/AddEquityForm';
import AddTrade from './components/AddTrade';
import ListTradesContainer from './components/ListTradesContainer';

class App extends Component {
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">

        {/* <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
          <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
        </Menu> */}
        <header className="App-header">
          <div className="logo">
            <Chart className="App-logo" alt="logo" />
            <div className="App-title">Poise Trade Station</div>
          </div>
            <nav className="nav-bar">
             <Link to="/addEquityForm">Add Equity</Link>
             <Link to="/addTrade">Add Trade</Link>
             <Link to="/trades">List Trades</Link>
            </nav>

        </header>
        <div>
          <Route path="/addEquityForm" component={AddEquityForm} />
          <Route path="/addTrade" component={AddTrade} />
          <Route path="/trades" component={ListTradesContainer} />
        </div>
        {/* <Route path="/Home" component={App} /> */}



      </div>
    );
  }
}

export default App;
