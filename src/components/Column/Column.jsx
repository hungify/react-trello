import React from 'react';
import PropTypes from 'prop-types';
import './Column.scss';
import Task from 'components/Task/Task';

Column.propTypes = {};

function Column(props) {
  return (
    <div className="column">
      <header>Brain storm</header>

      <ul className="task-list">
        <Task />
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
        <li className="task-item">
          You need to enable JavaScript to run this app.
        </li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
