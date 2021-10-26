import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container as BootstrapContainer, Row } from 'react-bootstrap';
import './BoardBar.scss';

BoardBar.propTypes = {};

function BoardBar(props) {
  return (
    <nav className="navbar-board">
      <BootstrapContainer className="trello-container">
        <Row>
          <Col sm={10} xs={12} className="col-no-padding">
            <div className="board-info">
              <div className="item board-logo-icon">
                <i className="fa fa-coffee" />
                &nbsp;&nbsp;<strong>MERN Stack</strong>
              </div>
              <div className="divider"></div>
              <div className="item board-type">Private workspace</div>
              <div className="divider"></div>
              <div className="item member-avatar">
                <img
                  src="https://images.unsplash.com/photo-1627808157800-32c3441fcc87?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="girl"
                />
                <img
                  src="https://images.unsplash.com/photo-1634412085609-a06c2c9f8eb6?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1621425724426-55e1d00f731a?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1634141756125-11375871830f?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDY0fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1608255780689-c4ace9fe5798?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
              <span className="more-members">+7</span>
              <span className="invite">Invite</span>
            </div>
          </Col>
          <Col sm={2} xs={12} className="col-no-padding">
            <div className="board-actions">
              <div className="item menu">
                <i className="fa fa-ellipsis-h mr-2 icon" />
                Show Menu
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default BoardBar;
