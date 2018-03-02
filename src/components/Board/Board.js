import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseUrl } from './../../config';
import { storeCards, swapCard } from './../../actions';
import List from '../List/List';
import './Board.css';

class Board extends Component {


  fetchCards() {
    fetch(baseUrl + '/cards')
      .then(response => response.json())
      .then(cards => {
        console.log('Fetched Cards: ', cards);
        this.props.storeCards(cards)
      })
  }

  deleteCard = (card) => {
    fetch((baseUrl + '/cards/' + card._id), { method: 'DELETE' })
      .then(this.fetchCards);
  }

  reverseSwapCard(data, srcStatus) {
    // Reverse redux store update
    data.target.list = srcStatus;
    this.props.swapCard(data);
  }

  swapCard = async (data) => {
    const card = data.src.card;
    const srcStatus = data.src.card.status;
    card.status = data.target.list;
    this.props.swapCard(data); // Optimistic update of redux store
    try {
      const response = await fetch((baseUrl + '/cards'), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      });
      // console.log(response);
      if (response.status === 503) this.reverseSwapCard(data, srcStatus);
    } catch (err) { this.reverseSwapCard(data, srcStatus) }
  }

  componentDidMount() {
    this.fetchCards();
  }

  renderList = (list) => {
    return (
      <List
        key={list}
        list={list}
        cards={this.props.cards.filter(card => card.status === list)}
        onClickDelete={this.deleteCard}
        swapCard={this.swapCard}
      />
    )
  }

  render() {
    return (
      <div className="board">
        <div> Setup: {this.renderList('setup')} </div>
        <div> Active: {this.renderList('active')} </div>
        <div> Sold: {this.renderList('sold')} </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  cards: state.cards
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  storeCards: (cards) => dispatch(storeCards(cards)),
  swapCard: (data) => dispatch(swapCard(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

