const initialState = {
  cards: [],
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_CARDS':
      return { ...state, cards: action.cards };
    default:
      return state
  }
}
export default board;