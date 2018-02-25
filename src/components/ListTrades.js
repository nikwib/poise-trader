import React from 'react';
import { TradeItem } from './TradeItem';

const renderListTrade = (props) => props.trades.map(trade => {
  return (
    <TradeItem
      key={trade._id}
      trade={trade}
      onClickDelete={props.onClickDelete}
    />);
 }
)

export const ListTrades = (props) => {
  return (
    <div>
      {renderListTrade(props)}
    </div>
  )
}


