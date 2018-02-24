import React, { Component } from 'react';
import { baseUrl } from './../config.js';
import "./AddEquityForm.css";

export class AddEquityForm extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  postEquity = (equity) => {
    console.log('POST: ', equity);
    fetch(baseUrl + '/addequity', { 
      method: 'POST', 
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify(equity) 
    })
      .then(response => { if (response.status === 404) console.log('404 Error'); })
      // .then(() => this.props.fetchTrades())
    // this.props.fetchTopics();
  }

  submit = (e) => {
    e.preventDefault();
    console.log('Name', this.refs.name.value);
    console.log('Ticker', this.refs.ticker.value);
    console.log('large', this.refs.large.checked);
    console.log('medium', this.refs.medium.checked);
    console.log('small', this.refs.small.checked);
    let size = '';
    if (this.refs.large.checked) size = 'large';
    else if (this.refs.medium.checked) size = 'medium';
    else if (this.refs.small.checked) size = 'small';
    const equity = {
      name: this.refs.name.value,
      ticker: this.refs.ticker.value,
      size: size
    };
    console.log('Equity', equity);
    this.postEquity(equity);
  }

  render() {
    return (
      <form onSubmit={this.submit} className="add-equity-form">
        <fieldset>
          <legend>Add Equity</legend>
          <div id="equity-name-input">
            <label htmlFor="name">Name:</label>
            <input 
              id="name"
              type="text"
              required 
              defaultValue="Swedish Match AB"
              ref="name"
              />
          </div>
          <div id="ticker-input">
            <label htmlFor="ticker">Ticker:</label>
            <input id="ticker"
              type="text"
              ref="ticker"
              defaultValue="SWMA"
              required />
          </div>
          <div className="select-size-input">
            <div>
              <input 
                name="size"
                id="large"
                type="radio"
                value="large"
                defaultChecked
                ref="large" />
              <label htmlFor="large"> Large</label>
            </div>
            <div>
              <input
                name="size"
                id="medium"
                type="radio"
                value="medium"
                ref="medium" />
              <label htmlFor="medium"> Medium</label>
            </div>
            <div>
              <input
                name="size"
                id="small"
                type="radio"
                value="small"
                ref="small" />
              <label htmlFor="small"> Small</label>
            </div>
          </div>
          <button>Add Equity</button>
        </fieldset>
      </form>
    )
  }
}