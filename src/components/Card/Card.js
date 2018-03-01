import React from 'react';
import './Card.css';
export const Card = (props) => (
  <div className="card">
    <button className="delete" onClick={() => props.onClickDelete(props.card)}>delete</button>
    <div className="title"> Card Title: {props.card.equity}</div>     
  </div>
)