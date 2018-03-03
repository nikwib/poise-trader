import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTime from 'react-datetime';
import * as moment from 'moment';
import { storeCard } from './../../actions'
import { baseUrl } from './../../config';
import "./CreateCard.css";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

const camelCase = (str) => {
  str = str[0].toLowerCase() + str.substr(1)
  return str.replace(' ', '');
}

const input = (title, defaultValue = "0", additionalClassNames) => (
  <TextField
    floatingLabelText={title}
    id={camelCase(title)}
    defaultValue={defaultValue}
    ref={camelCase(title)}>
  </TextField>
)

class CreateCard extends Component {
  postCard = (card) => {
    fetch(baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
      .then(response => response.json())
      .then(response => {
        this.props.storeCard(response);
        console.log('Response after post: ', response);
      })
      .catch(err => console.log('Error: ', err));
  }

  submit = (e) => {
    e.preventDefault();
    const card = {
      equity: this.refs.equity.input.value,
      quantity: this.refs.quantity.input.value,
      entryPrice: this.refs.entryPrice.input.value,
      entryDate: this.refs.entryDate.state.date,
      strategies: this.refs.strategies.input.value,
      exitPrice: this.refs.exitPrice.input.value,
      exitDate: this.refs.exitDate.state.date,
      ATR: this.refs.atr.input.value,
      notes: this.refs.notes.input.value,
      status: this.refs.status.input.value,
    };
    console.log('Refs', this.refs)
    console.log('Submit card: ',card)
    this.postCard(card)
  }

  render() {
    return (
      <form onSubmit={this.submit} className="add-card-form">
        {input('Equity', 'Swedish Match AB')}
        {input('Quantity', '0', 'quantity')}
        {input('Entry Price', '0', 'price')}
        <DatePicker floatingLabelText="Entry Date" ref="entryDate" />
        {input('Strategies', '0', 'strategies')}
        {input('Exit Price', '0', 'price')}
        <DatePicker floatingLabelText="Exit Date" ref="exitDate" />
        {input('atr', '3', 'atr')}
        {input('Notes', '3', 'notes')}
        {input('Status', 'setup', 'status')}
        <button>Add Equity</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  // cards: state.cards
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  storeCard: (card) => dispatch(storeCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
