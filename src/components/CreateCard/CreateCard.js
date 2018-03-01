import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeCard } from './../../actions'
import { baseUrl } from './../../config';
import "./CreateCard.css";

const camelCase = (str) => {
  str = str[0].toLowerCase() + str.substr(1)
  return str.replace(' ', '');
}

const input = (title, defaultValue="0", additionalClassNames) => (
  <div className={`add-card-input ${additionalClassNames}`}>
    <label htmlFor={camelCase(title)}>{title}:</label>
    <input
      id={camelCase(title)}
      type="text"
      required
      defaultValue={defaultValue}
      ref={camelCase(title)}
    />
  </div>
)

class CreateCard extends Component {

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
      .then(response => response.json())
      .then(response => {
        this.props.storeCard(response);
        console.log('Response after post: ',response);
      })
      .catch(err => console.log('Error: ', err));
      // .then(response => { if (response.status === 404) console.log('404 Error'); })

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
      ATR: this.refs.atr.value,
      notes: this.refs.notes.value,
      status: this.refs.status.value,
    };
    this.postCard(card)
  }

  render() {

    // console.log('myState: ', this.myState);
    return (
      <form onSubmit={this.submit} className="add-card-form">
        {/* <fieldset> */}
        {/* <legend>Add card</legend> */}
        {input('Equity','Swedish Match AB')}
        {input('Quantity', '0', 'quantity')}
        {input('Entry Price', '0', 'price')}
        {input('Entry Date', '2018-01-01', 'date')}
        {input('Strategies', '0', 'strategies')}
        {input('Exit Price', '0', 'price')}
        {input('Exit Date', '2018-01-02', 'date')}
        {input('atr', '3', 'atr')}
        {input('Notes', '3', 'notes')}
        {input('Status', 'setup', 'status')}
        <button>Add Equity</button>
        {/* </fieldset> */}
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

// export default CreateCard;