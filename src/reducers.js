const initialState = {
  cards: [],
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_CARDS': 
      return { ...state, cards: action.cards };
    case 'STORE_CARD':
      return { ...state, cards: state.cards.concat([action.card]) };
    case 'SWAP_CARD':
      return { ...state, cards: state.cards.map(card => {
        console.log('comparing', card._id, action.data.src.card._id);
        
        if (card._id === action.data.src.card._id) {
          // This is mutating, we can't mutate the state
          //  card.status = action.data.target.list;
          return {
            ...card,
            status: action.data.target.list
          }
        }
        return card;
      }) };

      default:
      return state
  }
}

export default board;