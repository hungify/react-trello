import React, { useCallback, useEffect, useState } from 'react';
import './Column.scss';
import Card from 'components/Card/Card';
import { Container, Draggable } from 'react-smooth-dnd';
import { mapOrder } from 'utilities/sorts';
import 'font-awesome/css/font-awesome.min.css';
import { Dropdown, Form } from 'react-bootstrap';
import ConfirmModal from 'components/Common/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants';
import {
  saveContentAfterPressEnter,
  selectAllInlineText,
} from 'utilities/contentEditable';

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const [columnTitle, setColumnTitle] = useState('');
  const handleColumnTitleChange = useCallback(
    (e) => setColumnTitle(e.target.value),
    []
  );

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = { ...column, _destroy: true };
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  };

  const handleColumnTitleBlur = () => {
    const newColumn = { ...column, title: columnTitle };
    onUpdateColumn(newColumn);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <Form.Control
          size="sm"
          type="text"
          placeholder="Enter column title"
          className="content-editable"
          spellCheck="false"
          onClick={selectAllInlineText}
          value={columnTitle}
          onChange={handleColumnTitleChange}
          onKeyDown={saveContentAfterPressEnter}
          onMouseDown={(e) => e.preventDefault()}
          onBlur={handleColumnTitleBlur}
        />
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />
            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove Column
              </Dropdown.Item>
              <Dropdown.Item>Remove all cards in this column</Dropdown.Item>
              <Dropdown.Item>Archive all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <div className="card-list">
        <Container
          orientation="vertical"
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" />
          Add another card
        </div>
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title}</strong> <br/> All related cards will be also be remove`}
      />
    </div>
  );
}

export default Column;
