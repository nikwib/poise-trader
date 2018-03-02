
export const storeCards = (cards) => ({
  type: 'STORE_CARDS',
  cards: cards,
});

export const storeCard = (card) => ({
  type: 'STORE_CARD',
  card: card,
});

export const swapCard = (data) => ({
  type: 'SWAP_CARD',
  data,
});
