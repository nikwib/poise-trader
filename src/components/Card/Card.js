import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import * as moment from 'moment';
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

  renderCard = ({ card, onClickDelete, onClickEdit, connectDragSource, isDragging }) => connectDragSource(
    <div style={{ opacity: isDragging ? 0.1 : 1 }} >
      <Paper style={style} zDepth={1}>
        <Card>
          <CardTitle className="equity" title={card.equity} subtitle={`Value: ${card.entryPrice * card.quantity}`} />
          <CardHeader
            title={card.equity}
            subtitle={`Value: ${card.entryPrice * card.quantity}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <Divider />
          <CardText expandable={true}>
            <CardText style={{ textAlign: 'left' }}>
                <h2>Entry</h2>
              <List>
                <ListItem primaryText={`Num: ${card.quantity}`} leftIcon={<ActionGrade />} />
                <Divider inset={true} />
                <ListItem primaryText={`Price: ${card.entryPrice}`} leftIcon={<ActionAccountBalance />} />
                <Divider inset={true} />
                <ListItem primaryText={`Date: ${moment(card.entryDate).format("DD-MMM")}`} leftIcon={<ActionDateRange />} />
              </List>
            </CardText>
            <Divider />
            <CardActions>
              <FlatButton label="delete" onClick={() => onClickDelete(card)} />
              <EditCard card={card} />
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
