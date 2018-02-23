import React, { Component } from 'react';
import "./AddEquityForm.css";

export class AddEquityForm extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (e) => {
    e.preventDefault();
    console.log('Name', this.refs.name.value);
    console.log('Ticker', this.refs.ticker.value);
    console.log('large', this.refs.large.checked);
    console.log('medium', this.refs.medium.checked);
    console.log('small', this.refs.small.checked);

  }

  render() {
    return (
      <form onSubmit={this.submit} className="add-equity-form">
        <fieldset>
          <legend>Add Equity</legend>
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              id="name"
              type="text"
              required 
              defaultValue="Swedish Match AB"
              ref="name"
              />
          </div>
          <div>
            <label htmlFor="ticker">Ticker:</label>
            <input id="ticker"
              type="text"
              ref="ticker"
              defaultValue="SWMA"
              required />
          </div>
          <div className="select-size">
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