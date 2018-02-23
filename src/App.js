import React, { Component } from 'react';
import logo from './logo.svg';
import Chart from 'react-icons/lib/md/insert-chart';
import './App.css';
import { slide as Menu } from 'react-burger-menu'
import { Route, Link } from 'react-router-dom';
import { AddEquityForm } from './components/AddEquityForm';
import Draggable from 'react-draggable'; // Both at the same time
 
class App extends Component {
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">

        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
          <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
        </Menu>
        <nav>
            <Link to="/addEquityForm">Add Equity</Link>
            {/* <Link to="/Home">Home</Link> */}

          </nav>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Poise Trade Station</h1>
        </header>
        <Draggable>
        <div>
          <Route path="/addEquityForm" component={AddEquityForm} />
        </div>
        </Draggable>
          {/* <Route path="/Home" component={App} /> */}



        <Chart />

        <div>New trade</div>

      </div>
    );
  }
}

export default App;
