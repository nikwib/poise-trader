import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseUrl } from './../../config';
import { storeCards } from './../../actions';
import { List } from '../List/List';
import './Board.css';

class Board extends Component {

  fetchCards = () =>  {
    fetch(baseUrl + '/cards')
      .then(response => response.json())
      .then(cards => {
        console.log('Fetched Cards: ',cards);
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

  render() {
    return (
      <div className="board">
        <div>
          Setup: <List
            key={'setup'}
            cards={this.props.cards.filter(card => card.status === 'setup')}
            onClickDelete={this.deleteCard}
          />
        </div>
        <div>
          Active: <List
            key={'active'}
            cards={this.props.cards.filter(card => card.status === 'active')}
            onClickDelete={this.deleteCard}
          />
        </div>
        <div>
          Sold: <List
            key={'sold'}
            cards={this.props.cards.filter(card => card.status === 'sold')}
            onClickDelete={this.deleteCard}
          />
        </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

