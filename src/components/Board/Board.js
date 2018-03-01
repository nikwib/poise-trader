import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseUrl } from './../../config';
import { storeCards } from './../../actions';
import { List } from '../List/List';
import './Board.css';

class Board extends Component {

  fetchCards() {
    fetch(baseUrl + '/cards')
      .then(response => response.json())
      .then(cards => {
        console.log(cards);
        this.props.storeCards(cards)
      })
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
          />
        </div>
        <div>
          Active: <List
            key={'active'}
            cards={this.props.cards.filter(card => card.status === 'active')}
          />
        </div>
        <div>
          Sold: <List
            key={'sold'}
            cards={this.props.cards.filter(card => card.status === 'sold')}
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

