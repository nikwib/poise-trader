import React, { Component } from 'react';
import { baseUrl } from './../config.js';
import { ListTrades } from './ListTrades'
import { TradeListHeader } from './TradeListHeader'

class ListTradesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trades: []
    };
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = () => {
    fetch(baseUrl + '/trades')
      .then(response => response.json())
      .then(trades => {
        this.setState({ trades: trades })
        // console.log(trades)
      })
      .catch(err => console.error(err))
  }

  deleteTrade = (trade) => {
    fetch(baseUrl + '/trades/' + trade._id, {
      method: 'DELETE'
    })
      // .then(this.fetchList)
      .catch(err => console.error(err))
  }

  render() {
    // console.log('trades: ', this.state.trades);
    return (
      <div>
        <TradeListHeader/>
 
        <ListTrades
          trades={this.state.trades}
          onClickDelete={this.deleteTrade}
        />
      </div>

    )
  }
}

export default ListTradesContainer;