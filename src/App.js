import React, { Component } from 'react';
import Chart from 'react-icons/lib/md/insert-chart';
import './App.css';
import Board from './components/Board/Board'
import CreateCard from './components/CreateCard/CreateCard';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <Chart className="App-logo" alt="logo" />
            <div className="App-title">Poise Trade Station</div>
          </div>
        </header>
        <CreateCard/>
        <Board />

      </div>
    );
  }
}

export default App;