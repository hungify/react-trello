import React, { useEffect, useState, useRef } from 'react';
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { isEmpty, cloneDeep } from 'lodash';
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
import {
  fetchBoardDetail,
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard,
} from 'actions/api';

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
    const boardId = '6176bfe63144a90cc8c10694';
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

  const onColumnDrop = async (dropResult) => {
    let newColumns = cloneDeep(columns);
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = cloneDeep(board);
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
    // Call api update columnOrder in board details
    try {
      await updateBoard(newBoard._id, newBoard);
    } catch (error) {
      setColumns(columns);
      setBoard(board);
    }
  };

  const onCardDrop = async (columnId, dropResult) => {
    if (dropResult.removedIndex || dropResult.addedIndex) {
      let newColumns = cloneDeep(columns);

      let currentColumn = newColumns.find((c) => c._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);
      setColumns(newColumns);

      if (dropResult.removedIndex && dropResult.addedIndex) {
        // Move card inside its column
        try {
          await updateColumn(currentColumn._id, currentColumn);
        } catch (error) {
          setColumns(columns);
        }
      } else {
        // Move card between its two columns
        try {
          await updateColumn(currentColumn._id, currentColumn);
        } catch (error) {
          setColumns(columns);
        }
        if (dropResult.addedIndex) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = currentColumn._id;
          try {
            await updateCard(currentCard._id, currentCard);
          } catch (error) {
            setColumns(columns);
          }
        }
      }
    }
  };

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim(),
    };
    const column = await createNewColumn(newColumnToAdd);

    let newColumns = cloneDeep(columns);
    newColumns.push(column);

    let newBoard = cloneDeep(board);
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);

    setNewColumnTitle('');
    toggleOpenNewColumnForm();
  };

  const onUpdateColumnState = (newColumnUpdate) => {
    const columnIdToUpdate = newColumnUpdate._id;

    let newColumns = cloneDeep(columns);
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
    let newBoard = cloneDeep(board);
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
              onUpdateColumnState={onUpdateColumnState}
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
