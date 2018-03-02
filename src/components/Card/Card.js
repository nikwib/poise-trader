import React from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../constants';
import './Card.css';

const CardSource = {
  beginDrag (props, monitor) {
    // const item = {cardId: props.card._id}
    const item = { props: props };
    return item;
  }
};

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Card = ({ onClickDelete, card, connectDragSource, isDragging }) => connectDragSource(
  <div className="card" style={{ opacity: isDragging ? 0.0 : 1 }}  >
    <button className="delete" onClick={() => onClickDelete(card)}>delete</button>
    <div className="title"> Card Title: {card.equity}</div>
  </div>
);


export default DragSource(ItemTypes.CARD, CardSource, collect)(Card);


// const Card = (props) => (
//   <div className="card"  style={{opacity: isDragging ? 0.0 : 1}}  >
//     <button className="delete" onClick={() => props.onClickDelete(props.card)}>delete</button>
//     <div className="title"> Card Title: {props.card.equity}</div>
//   </div>
// )
