import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeCard } from './../../actions'
import { baseUrl } from './../../config';
import "./CreateCard.css";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import { darkWhite } from 'material-ui/styles/colors';

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
  state = {
    open: false,
  };

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
    this.postCard(card)
    this.handleClose();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit}
      />,
    ];

    return (
      <div>
        <FlatButton label="Add Trade" onClick={this.handleOpen} labelStyle={{color: darkWhite}}/>
        <Dialog
          title="Create new trade position"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form className="add-card-form">
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
          </form>
          Bide your time and wait until your target manifests your desired margin of safety. <br/>
          Never rush your decisions. Chasing an investment means you’re already too late. 
        </Dialog>
      </div>

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
