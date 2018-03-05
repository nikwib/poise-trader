import React from 'react';
import CreateCard from '../CreateCard/CreateCard';
import Chart from 'react-icons/lib/md/insert-chart';
import './Header.css';
export const Header = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <Chart className="App-logo" alt="logo" />
        <div className="App-title">Poise Trade Station</div>
      </div>
      <div className="create-card"><CreateCard /></div>
    </header>
  );
};
