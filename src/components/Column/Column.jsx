import React from 'react';
import PropTypes from 'prop-types';
import './Column.scss';
import Card from 'components/Card/Card';
import { mapOder } from 'utilities/sorts';

Column.propTypes = {};

function Column(props) {
  const { column } = props;
  const cards = column.cards
  // mapOder(column.cards, column.cardOrder, 'id');
  return (
    <div className="column">
      <header>{column.title}</header>

      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
