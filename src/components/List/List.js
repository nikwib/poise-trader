import React from 'react';
import { DropTarget } from 'react-dnd';
import Card from '../Card/Card';
import { ItemTypes } from '../../constants';
import './List.css';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
const styles = {
  gridList: {
    width: '100%',
    height: 54,
    overflowY: 'auto',
  },
};

const listDropTarget = {
  drop: function (props, monitor) {
    const item = monitor.getItem();
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
    isOver: monitor.isOver()
  };
}

const renderList = (cards, onClickDelete, onClickEdit) => cards.map(card => {
  return (
    <Card
      key={card._id}
      card={card}
      onClickDelete={onClickDelete}
      onClickEdit={onClickEdit}
    />);
}
);

const List = ({ list, cards, onClickDelete, onClickEdit, isOver, connectDropTarget }) => connectDropTarget(
  <div className='list' style={{ padding: '5px', opacity: isOver ? 0.5 : 1 }}>
    <GridTile
      key={list}
      title={list.toUpperCase()}
      actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      actionPosition="left"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
    >
      <div className="spacer"></div>
      {renderList(cards, onClickDelete, onClickEdit)}
    </GridTile>

  </div>

);

export default DropTarget(ItemTypes.CARD, listDropTarget, collect)(List);




//    {cards.map(card => (<Card key={card._id} card={card} onClickDelete={props.onClickDelete} />)}

//      onClickDelete={props.onClickDelete}
// const List = (props) => {
//   const { key, list, card, onClickDelete, dispatch, connectDropTarget } = props;
//   return connectDropTarget(
//     <div className='list'>
//       {renderList(props)}
//     </div>
//   );
// }