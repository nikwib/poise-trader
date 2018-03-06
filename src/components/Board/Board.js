import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseUrl } from './../../config';
import { storeCards, swapCard } from './../../actions';
import List from '../List/List';
import EditCard from '../Card/EditCard';
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editCard: false,
    };
  };

  fetchCards = () => {
    fetch(baseUrl + '/cards')
      .then(response => response.json())
      .then(cards => {
        this.props.storeCards(cards)
      })
  }

  deleteCard = (card) => {
    fetch((baseUrl + '/cards/' + card._id), { method: 'DELETE' })
      .then(this.fetchCards);
  }

  updateCard = (card) => (
    fetch((baseUrl + '/cards'), {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    })
  )

  swapCard = async (data) => {
    const card = data.src.card;
    const srcStatus = data.src.card.status;
    card.status = data.target.list;
    this.props.swapCard(data); // Optimistic update of redux store
    try {
      const response = await this.updateCard(card)
      if (response.status !== 200) {
        // Reverse redux store update
        data.target.list = srcStatus;
        this.props.swapCard(data);
      }
    } catch (err) {
      data.target.list = srcStatus;
      this.props.swapCard(data);
    }
  }

  renderEditCard = (card) => {
    this.setState({ editCard: true, cardToEdit: card });
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
        onClickEdit={this.renderEditCard}
        swapCard={this.swapCard}
      />
    )
  }

  render() {
    return (
      <div className="board">
        <div> {this.renderList('setup')} </div>
        <div> {this.renderList('active')} </div>
        <div> {this.renderList('sold')} </div>
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

