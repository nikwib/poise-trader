import React, { Component } from 'react';
import { baseUrl } from './../../config';
import "./CreateCard.css";


class CreateCard extends Component {
  myState = {
    equity: 'Poise AB',
    quantity: 0,
    entryPrice: 0,
    entryDate: '2000-01-01',
    strategies: '',
    exitPrice: 0,
    exitDate: '2000-01-02',
    ATR: 0,
    notes: '',
    status: 'setup',
  }

  postCard = (card) => {
    console.log('POST: ', card);
    fetch(baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
      .then(response => { if (response.status === 404) console.log('404 Error'); })

    // .then(() => this.props.fetchTrades())
    // this.props.fetchTopics();
  }

  submit = (e) => {
    e.preventDefault();
    const card = {
      equity: this.refs.equity.value,
      quantity: this.refs.quantity.value,
      entryPrice: this.refs.entryPrice.value,
      entryDate: this.refs.entryDate.value,
      strategies: this.refs.strategies.value,
      exitPrice: this.refs.exitPrice.value,
      exitDate: this.refs.exitDate.value,
      ATR: this.refs.ATR.value,
      notes: this.refs.notes.value,
      status: this.refs.status.value,
    };
    this.postCard(card)
  }

  render() {

    console.log('myState: ', this.myState);
    return (
      <form onSubmit={this.submit} className="add-card-form">
        {/* <fieldset> */}
        {/* <legend>Add card</legend> */}
        <div className="add-card-input">
          <label htmlFor="equity">Equity:</label>
          <input
            id="equity"
            type="text"
            required
            defaultValue="Swedish Match AB"
            ref="equity"
          />
        </div>
        <div className="add-card-input quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="text"
            required
            defaultValue="0"
            ref="quantity"
          />
        </div>
        <div className="add-card-input price">
          <label htmlFor="entryPrice">Entry-Price:</label>
          <input
            id="entryPrice"
            type="text"
            required
            defaultValue="0"
            ref="entryPrice"
          />
        </div>
        <div className="add-card-input">
          <label htmlFor="entryDate">Entry Date:</label>
          <input
            id="entryDate"
            type="text"
            required
            defaultValue="2018-01-01"
            ref="entryDate"
          />
        </div>
        <div className="add-card-input">
          <label htmlFor="strategies">Strategies:</label>
          <input
            id="strategies"
            type="text"
            required
            defaultValue="0"
            ref="strategies"
          />
        </div>
        <div className="add-card-input price">
          <label htmlFor="exitPrice">Exit-Price:</label>
          <input
            id="exitPrice"
            type="text"
            required
            defaultValue="0"
            ref="exitPrice"
          />
        </div>
        <div className="add-card-input">
          <label htmlFor="exitDate">Exit Date:</label>
          <input
            id="exitDate"
            type="text"
            required
            defaultValue="2018-01-02"
            ref="exitDate"
          />
        </div>
        <div className="add-card-input">
          <label htmlFor="ATR">ATR:</label>
          <input
            id="ATR"
            type="text"
            required
            defaultValue="0"
            ref="ATR"
          />
        </div>
        <div className="add-card-input">
          <label htmlFor="notes">Notes:</label>
          <input
            id="notes"
            type="text"
            required
            defaultValue="0"
            ref="notes"
          />
        </div>
        <div className="add-card-input">
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            type="text"
            required
            defaultValue="setup"
            ref="status"
          />
        </div>
        <button>Add Equity</button>
        {/* </fieldset> */}
      </form>

    )
  }
}


export default CreateCard;