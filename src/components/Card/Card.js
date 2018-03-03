import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import * as moment from 'moment';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';

import { ItemTypes } from '../../constants';
import EditCard from '../Card/EditCard';
import './Card.css';

const CardSource = {
  beginDrag(props, monitor) {
    const item = { props: props };
    return item;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const style = {
  width: 250,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

class TradeCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  };

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  renderCard = ({card, onClickDelete, onClickEdit, connectDragSource, isDragging }) => connectDragSource(
    <div style={{ opacity: isDragging ? 0.1 : 1 }} >
      <Paper style={style} zDepth={1}>
        <Card>
          <CardHeader
            title={card.equity}
            subtitle={`Value: ${card.entryPrice * card.quantity}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <CardText style={{ textAlign: 'left' }}>
              <List>
                <ListItem primaryText={`Num: ${card.quantity}`} leftIcon={<ActionGrade />} />
                <ListItem primaryText={`Price: ${card.entryPrice}`} leftIcon={<ActionAccountBalance />} />
                <ListItem primaryText={`Date: ${moment(card.entryDate).format("DD-MMM")}`} leftIcon={<ActionDateRange />} />
              </List>

              Quantity: {card.quantity}/>
            Entry price: {card.entryPrice}<br />
              Entry date: {moment(card.entryDate).format("DD-MMM")}
            </CardText>
            <Divider />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            <Divider inset={true} />

          <CardActions>
              <FlatButton label="delete" onClick={() => onClickDelete(card)} />
                <EditCard card={card}/>
              <FlatButton label="edit" onClick={() => onClickEdit(card)} />
            </CardActions>
          </CardText>
        </Card>
      </Paper>
    </div>
  );

  render() {
    return (
      <div>
        {this.renderCard(this.props)}
      </div>
    )
  }
}

export default DragSource(ItemTypes.CARD, CardSource, collect)(TradeCard);



      // {/* <Card>
      //   <CardTitle className="equity" title={card.equity} subtitle="Card subtitle" />

      //   <CardText>
      //     <Toggle
      //       toggled={this.state.expanded}
      //       onToggle={this.handleToggle}
      //       labelPosition="right"
      //       label="This toggle controls the expanded state of the component."
      //     />
      //   </CardText>

      //   <CardText expandable={true}>
      //     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      //     Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      //     Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      //     Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      //   </CardText>

      //   <div className="quantity"> Quantity: {card.quantity}</div>
      //   <div className="entry-price"> Entry price: {card.entryPrice}</div>
      //   <div className="entry-date"> Entry date: {moment(card.entryDate).format("DD-MMM")}</div>

      //   <CardActions>
      //     <div className="buttons">
      //       <FlatButton label="Delete" />
      //       <FlatButton label="Edit" />
      //     </div>
      //   </CardActions>
      // </Card> */}


// const TradeCard = ({ onClickEdit, onClickDelete, card, connectDragSource, isDragging }) => connectDragSource(
//   <div className="top" style={styles(isDragging)} >
//     <Card>
//       <CardTitle className="equity" title={card.equity} subtitle="Card subtitle" />
//       <CardText expandable={true}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
//         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
//         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
//       </CardText>
//       <div className="quantity"> Quantity: {card.quantity}</div>
//       <div className="entry-price"> Entry price: {card.entryPrice}</div>
//       <div className="entry-date"> Entry date: {moment(card.entryDate).format("DD-MMM")}</div>

//       <CardActions>
//         <div className="buttons">
//           <FlatButton label="Delete" />
//           <FlatButton label="Edit" />
//         </div>
//       </CardActions>
//     </Card>
//   </div>
// );




// const TradeCard = ({ onClickEdit, onClickDelete, card, connectDragSource, isDragging }) => connectDragSource(
//   <div className="card" style={styles(isDragging)} >
//     <Card>
//       <CardHeader>
//         <div className="card-header">
//           <div className="equity"> {card.equity}</div>
//           <div className="buttons">
//             <IconButton iconClassName="muidocs-icon-custom-github" className="delete" onClick={() => onClickDelete(card)} />
//             <IconButton iconClassName="muidocs-icon-custom-github" className="edit" onClick={() => onClickEdit(card)} />

//           </div>
//         </div>
//       </CardHeader>
//       <div className="quantity"> {card.quantity}</div>
//       <div className="entry-price"> {card.entryPrice}</div>
//       <div className="entry-date"> {moment(card.entryDate).format("DD-MMM")}</div>
//     </Card>
//   </div>
// );


// const Card = (props) => (
//   <div className="card"  style={{opacity: isDragging ? 0.0 : 1}}  >
//     <button className="delete" onClick={() => props.onClickDelete(props.card)}>delete</button>
//     <div className="title"> Card Title: {props.card.equity}</div>
//   </div>
// )


// { <button className="delete" onClick={() => onClickDelete(card)}>delete</button>
// <button className="edit" onClick={() => onClickEdit(card)}>edit</button> }


// const CardExampleExpandable = () => (
//   <Card>
//     <CardHeader
//       title="Without Avatar"
//       subtitle="Subtitle"
//       actAsExpander={true}
//       showExpandableButton={true}
//     />
//     <CardActions>
//       <FlatButton label="Action1" />
//       <FlatButton label="Action2" />
//     </CardActions>
//     <CardText expandable={true}>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//       Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
//       Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
//       Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
//     </CardText>
//   </Card>
// );

//          <IconButton iconClassName="muidocs-icon-custom-github" className="delete" onClick={() => onClickDelete(card)} />
 //         <IconButton iconClassName="muidocs-icon-custom-github" className="edit" onClick={() => onClickEdit(card)} />
