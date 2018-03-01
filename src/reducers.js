const initialState = {
  cards: [],
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_CARDS':
      return { ...state, cards: action.cards };
    case 'STORE_CARD':
      return { ...state, cards: state.cards.concat([action.card]) };

      default:
      return state
  }
}
export default board;