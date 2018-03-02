import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { baseUrl } from './../../config';
import { storeCards, swapCard } from './../../actions';
import List from '../List/List';
import './Board.css';

class Board extends Component {


  fetchCards = () => {
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
        swapCard={this.props.swapCard}
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

