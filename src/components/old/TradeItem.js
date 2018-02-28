import React from 'react';
import './TradeItem.css';
export const TradeItem = (props) => (
  <div className="trade-item">
    <button className="delete" onClick={() => props.onClickDelete(props.trade)}>delete</button>
    <div className="equity"> Equity: {props.trade.equity}</div>
    <div className="quantity"> Quantity: {props.trade.quantity}</div>
    <div className="entry-price"> Entry Price: {props.trade.entryPrice}</div>
    <div className="entry-date"> Entry Date: {props.trade.entryDate}</div>
    <div className="strategies"> Strategy: {props.trade.strategies}</div>
    <div className="exit-price"> Exit Price: {props.trade.exitPrice}</div>
    <div className="atr"> ATR: {props.trade.atr}</div>
    <div className="notes"> Notes: {props.trade.notes}</div>
  </div>
  )