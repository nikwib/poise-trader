import React from 'react';
import { Card } from '../Card/Card';

const renderList = (props) => props.cards.map(card => {
  return (
    <Card
      key={card._id}
      card={card}
      onClickDelete={props.onClickDelete}
    />);
 }
)
  
export const List = (props) => {
  return (
    <div>      
      {renderList(props)}
    </div>
  )
}

