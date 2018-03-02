import React, { Component } from 'react';
import Chart from 'react-icons/lib/md/insert-chart';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
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
// Make App and its components part of the Drag and drop context.
export default DragDropContext(HTML5Backend)(App);
