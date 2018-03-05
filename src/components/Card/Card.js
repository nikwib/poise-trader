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
import { baseUrl } from './../../config';



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
      quotes: [],
      quote: {}
     };
  };

  fetchQuote = async (ticker) => {
    try{
      await fetch(baseUrl + '/quotes/' + ticker)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ quote: response })
      })
    } catch (e) {
      console.log('Error featching quote: ',e);
    }
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
          <CardTitle className="equity" 
          title={Object.keys(this.state.quote).length > 0 ? this.state.quote.price.shortName : card.equity}
          subtitle={`Value: ${Object.keys(this.state.quote).length > 0 ? this.state.quote.price.regularMarketPrice  * card.quantity : 0}`} />
          <CardHeader
          title={card.equity.toUpperCase()} 
            subtitle={`Result: 
              ${Object.keys(this.state.quote).length > 0 ? 
              ((this.state.quote.price.regularMarketPrice * card.quantity) - (card.entryPrice * card.quantity)) 
              : 0}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <Divider />
          <CardText expandable={true}>
            <CardText style={{ textAlign: 'left' }}>
              <h2>Entry</h2>
              Price: {Object.keys(this.state.quote).length > 0 ? this.state.quote.price.regularMarketPrice : '0'}
              Open: {Object.keys(this.state.quote).length > 0 ? this.state.quote.summaryDetail.open : '0'}
              Day high: {Object.keys(this.state.quote).length > 0 ? this.state.quote.summaryDetail.dayHigh : '0'}
              Day low: {Object.keys(this.state.quote).length > 0 ? this.state.quote.summaryDetail.dayLow : '0'}
              Market: {Object.keys(this.state.quote).length > 0 ? this.state.quote.price.marketState : '0'}

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


  componentDidMount() {    
    this.fetchQuote(this.props.card.equity);
    const realtimer = setInterval((() => this.fetchQuote(this.props.card.equity)), 10000);   
  }

  render() {
    return (
      <div>
        {this.renderCard(this.props)}
      </div>
    )
  }
}

export default DragSource(ItemTypes.CARD, CardSource, collect)(TradeCard);
