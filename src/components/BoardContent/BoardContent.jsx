import React, { useEffect, useState, useRef } from 'react';
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { isEmpty } from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dragDrop';
import {
  Container as BootstrapContainer,
  Col,
  Row,
  Form,
  Button,
} from 'react-bootstrap';
import { fetchBoardDetail } from 'actions/api';

BoardContent.propTypes = {};

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumn, setOpenNewColumn] = useState(false);
  const toggleOpenNewColumnForm = () => setOpenNewColumn(!openNewColumn);

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value);

  const newColumnInputRef = useRef(null);

  useEffect(() => {
    const boardId = '617553cbd5ada8f2c313f7e4';
    fetchBoardDetail(boardId).then((board) => {
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'));
    });
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openNewColumn]);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);
      setColumns(newColumns);
    }
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      _id: Math.random().toString(36).substr(2, 5),
      boardId: board._id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);

    setNewColumnTitle('');
    toggleOpenNewColumnForm();
  };

  const onUpdateColumn = (newColumnUpdate) => {
    const columnIdToUpdate = newColumnUpdate._id;

    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i._id === columnIdToUpdate
    );
    if (newColumnUpdate._destroy) {
      //Remove column
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      //Update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnUpdate);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column  -drop-preview',
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-container">
        {!openNewColumn && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" />
              Add another card
            </Col>
          </Row>
        )}

        {openNewColumn && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title"
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) => event.key === 'Enter' && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

export default BoardContent;
