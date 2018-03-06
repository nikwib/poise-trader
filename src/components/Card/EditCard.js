
import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import * as moment from 'moment';

import { baseUrl } from './../../config';
import { updateCard } from './../../actions';

const camelCase = (str) => {
  str = str[0].toLowerCase() + str.substr(1)
  return str.replace(' ', '');
}

const input = (title, defaultValue = "0", additionalClassNames) => (
  <TextField
    floatingLabelText={title}
    type="text"
    id={camelCase(title)}
    defaultValue={defaultValue}
    ref={camelCase(title)}>
  </TextField>
)


class EditCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  updateCard = async (card) => (
    await fetch((baseUrl + '/cards'), {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    })
  )

  submit = (e) => {
    e.preventDefault();

    const card = {
      ...this.props.card,
      equity: this.refs.equity.input.value,
      quantity: this.refs.quantity.input.value,
      entryPrice: this.refs.entryPrice.input.value,
      entryDate: this.refs.entryDate.input.value,
      strategies: this.refs.strategies.input.value,
      exitPrice: this.refs.exitPrice.input.value,
      exitDate: this.refs.entryDate.input.value,
      ATR: this.refs.atr.input.value,
      notes: this.refs.notes.input.value,

    }
    console.log('Refs', this.refs.equity.input.value)
    console.log('Submit card: ', card)

    this.updateCard(card);
    this.props.updateCard(card);
  }

  render() {
    return (
      <div>
        <FlatButton
          onClick={this.handleClick}
          label="Edit"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <div>
            <form onSubmit={this.submit} className="add-card-form">
              <TextField
                id="equity"
                type="text"
                floatingLabelText="Equity"
                defaultValue={this.props.card.equity}
                ref="equity"
              />
              {input('Quantity', this.props.card.quantity, 'quantity')}
              {input('Entry Price', this.props.card.entryPrice, 'price')}
              {input('Entry Date', new Date(this.props.card.entryDate), 'date')}
              {input('Strategies', '', 'strategies')}
              {input('Exit Price', '', 'price')}
              {input('Exit Date', new Date(this.props.card.exitDate), 'date')}
              {input('atr', '', 'atr')}
              {input('Notes', '', 'notes')}
              <button>Update </button>
            </form>
          </div>
        </Popover>
      </div>
    );
  }
}


// entryDate: this.refs.entryDate.input.value,
//              <DatePicker floatingLabelText="Entry Date" ref="entryDate" value={new Date(this.props.card.entryDate)}/>

const mapStateToProps = (state) => ({
  // Map your state to props
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  updateCard: (cards) => dispatch(updateCard(cards)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);

