import React from 'react';
import './TradeListHeader.css';
export const TradeListHeader = (props) => (
  <div className="trade-list-header">
    <div className="equity"> Equity: </div>
    <div className="quantity"> Quantity: </div>
    <div className="entry-price"> Entry Price: </div>
    <div className="entry-date"> Entry Date: </div>
    <div className="strategies"> Strategy: </div>
    <div className="exit-price"> Exit Price: </div>
    <div className="atr"> ATR: </div>
    <div className="notes"> Notes: </div>
  </div>
)