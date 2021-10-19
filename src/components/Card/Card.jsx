import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

Card.propTypes = {};

function Card(props) {
  const { card } = props;
  return (
    <div className="card-item">
      {card.cover && (
        <img
          src={card.cover}
          className="card-cover"
          alt="img"
          draggable="false"
        />
      )}
      {card.title}
    </div>
  );
}

export default Card;
