import React from 'react';
import PropTypes from 'prop-types';
import './Task.scss';

Task.propTypes = {};

function Task(props) {
  return (
    <li className="task-item">
      <img
        src="https://images.unsplash.com/photo-1634351395713-0deccec2378b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80"
        alt=""
      />
      title: Hahaha
    </li>
  );
}

export default Task;
