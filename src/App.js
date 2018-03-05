import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import Board from './components/Board/Board';
import { Header } from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Board />
      </div>
    );
  }
}
// Make App and its components part of the Drag and drop context.
export default DragDropContext(HTML5Backend)(App);
