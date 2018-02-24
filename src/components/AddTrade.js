import React, { Component } from 'react';
import { baseUrl } from './../config.js';
import "./AddTrade.css";


class AddTrade extends Component {
  myState = {    
    equity: '',
    quantity: 0,
    entryPrice: 0,
    entryDate: '2000-01-01',
    // strategies: [{}],
    strategies: '',
    exitPrice: 0,
    exitDate: '2000-01-02',
    ATR: 0,
    notes: '',
  }

  postTrade = (trade) => {
    console.log('POST: ', trade);
    fetch(baseUrl + '/addtrade', { 
      method: 'POST', 
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify(trade) 
    })
      .then(response => { if (response.status === 404) console.log('404 Error'); })
      // .then(() => this.props.fetchTrades())
    // this.props.fetchTopics();
  }

  submit = (e) => {
    e.preventDefault();
    const trade = {
      equity: this.refs.equity.value,
      quantity: this.refs.quantity.value,
      entryPrice: this.refs.entryPrice.value,
      entryDate: this.refs.entryDate.value,
      strategies:this.refs.strategies.value,
      exitPrice: this.refs.exitPrice.value,
      exitDate: this.refs.exitDate.value,
      ATR: this.refs.ATR.value,
      notes: this.refs.notes.value        
    };
    this.postTrade(trade)
  }
  
  render() {
    
    console.log('myState: ', this.myState);
    return (
      <form onSubmit={this.submit} className="add-trade-form">
        {/* <fieldset> */}
          {/* <legend>Add trade</legend> */}
          <div className="add-trade-input">
            <label htmlFor="equity">Equity:</label>
            <input 
              id="equity"
              type="text"
              required 
              defaultValue="Swedish Match AB"
              ref="equity"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="quantity">Quantity:</label>
            <input 
              id="quantity"
              type="text"
              required 
              defaultValue="0"
              ref="quantity"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="entryPrice">Entry Price:</label>
            <input 
              id="entryPrice"
              type="text"
              required 
              defaultValue="0"
              ref="entryPrice"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="entryDate">Entry Date:</label>
            <input 
              id="entryDate"
              type="text"
              required 
              defaultValue="2018-01-01"
              ref="entryDate"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="strategies">Strategies:</label>
            <input 
              id="strategies"
              type="text"
              required 
              defaultValue="0"
              ref="strategies"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="exitPrice">Exit Price:</label>
            <input 
              id="exitPrice"
              type="text"
              required 
              defaultValue="0"
              ref="exitPrice"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="exitDate">Exit Date:</label>
            <input 
              id="exitDate"
              type="text"
              required 
              defaultValue="2018-01-02"
              ref="exitDate"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="ATR">ATR:</label>
            <input 
              id="ATR"
              type="text"
              required 
              defaultValue="0"
              ref="ATR"
              />
          </div>
          <div className="add-trade-input">
            <label htmlFor="notes">Notes:</label>
            <input 
              id="notes"
              type="text"
              required 
              defaultValue="0"
              ref="notes"
              />
          </div>          
          <button>Add Equity</button>
        {/* </fieldset> */}
      </form>

    )
  }
}

export default AddTrade;