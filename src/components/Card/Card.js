import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import * as moment from 'moment';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import Chip from 'material-ui/Chip';
import { ItemTypes } from '../../constants';
import EditCard from '../Card/EditCard';
import CreateCard from '../CreateCard/CreateCard';
import Graph from './../Graph/Graph';
import './Card.css';
import { baseUrl } from './../../config';
import { round } from './../../util';

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

const paperStyle = {
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

class TradeCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      quote: {}
    };
  };
  
  componentDidMount() {
    this.fetchQuote(this.props.card.equity);
    const realTimer = setInterval((() => this.fetchQuote(this.props.card.equity)), 10000);
    
  }
  componentDidUpdate(){
  }

  fetchQuote = async (ticker) => {
    try {
      await fetch(baseUrl + '/quotes/' + ticker)
        .then(response => response.json())
        .then(response => this.setState({ quote: response }))

    } catch (e) {
      console.log('Error fetching quote: ', e);
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

  ready = () => (Object.keys(this.state.quote).length > 0);
  shortName = () => this.state.quote.price.shortName;
  marketPrice = () => (this.ready() ? this.state.quote.price.regularMarketPrice : 0);
  currency = () => this.state.quote.summaryDetail.currency;
  volume = () => this.state.quote.summaryDetail.volume;
  previousClose = () => this.state.quote.summaryDetail.previousClose;
  open = () => this.state.quote.summaryDetail.open;
  dayHigh = () => this.state.quote.summaryDetail.dayHigh;
  dayLow = () => this.state.quote.summaryDetail.dayLow;
  result = (card) => (round(((this.marketPrice() * card.quantity) - (card.entryPrice * card.quantity)), 2) + ' ' + this.currency());
  value = (card) => {
    const value = (this.ready() ? round((this.marketPrice() * card.quantity), 2) : 0);
    return value;
  }
  change = () => (this.ready()? round((((this.marketPrice()/this.open())-1)*100),2) : 0);

  renderCard = ({ card, onClickDelete, onClickEdit, connectDragSource, isDragging }) => connectDragSource(
    <div className='trade-card' style={{ opacity: isDragging ? 0.1 : 1 }} >
      <Paper style={paperStyle} zDepth={1}>
        <Card>
          <CardTitle className="equity"
            title={this.ready() ? this.shortName() : card.equity}
            subtitle={`${this.marketPrice()}  ${this.change()} %`} />
          <CardHeader
            title={card.equity.toUpperCase()}
            subtitle={`Result: ${this.ready() ? this.result(card) : ''}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <Divider />
          <CardText expandable={true}>
            <CardText style={{ textAlign: 'left' }}>
              <h2>Day range:</h2>
              <p>Open: {this.ready() ? this.open() : '0'}</p>
              <p>Day high: {this.ready() ? this.dayHigh() : '0'}</p>
              <p>Day low: {this.ready() ? this.dayLow() : '0'}</p>
              <h2>Result</h2>
              <p>{this.value(card)}</p>
              <List>
                <ListItem primaryText={`Num: ${card.quantity}`} leftIcon={<ActionGrade />} />
                <Divider inset={true} />
                <ListItem primaryText={`Price: ${card.entryPrice}`} leftIcon={<ActionAccountBalance />} />
                <Divider inset={true} />
                <ListItem primaryText={`Date: ${moment(card.entryDate).format("DD-MMM")}`} leftIcon={<ActionDateRange />} />
                <Graph/>
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
