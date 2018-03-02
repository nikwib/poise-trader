import React from 'react';
import { DropTarget } from 'react-dnd';
import Card from '../Card/Card';
import { ItemTypes } from '../../constants';
import { swapCard } from '../../actions';
import './List.css';

const listDropTarget = {
  drop: function (props, monitor) {
    const item = monitor.getItem();
    console.log('item: ',item);
    console.log('props: ',props);
    const data = {
      src: {
        card: item.props.card,
      },
      target: {
        list: props.list,
      },
    };
    props.swapCard(data);
  },
  canDrop() {
    return true;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

const renderList = (cards, onClickDelete) => cards.map(card => {
  return ( <Card key={card._id}  card={card} onClickDelete={onClickDelete}/>);
}
)

const List = ({ cards, onClickDelete,  connectDropTarget }) => connectDropTarget(
  <div className='list'>
    {renderList(cards, onClickDelete)}
  </div>
);

export default DropTarget(ItemTypes.CARD, listDropTarget, collect)(List);




//    {cards.map(card => ( <Card key={card._id} card={card} onClickDelete={props.onClickDelete} />)}

//      onClickDelete={props.onClickDelete}
// const List = (props) => {
//   const { key, list, card, onClickDelete, dispatch, connectDropTarget } = props;
//   return connectDropTarget(
//     <div className='list'>
//       {renderList(props)}
//     </div>
//   );
// }