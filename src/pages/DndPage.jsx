import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Dnd.css';

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [{ id: '3', content: 'Current task' }],
        },
        done: {
            name: 'Done',
            items: [
                { id: '4', content: 'Done task' }
            ],
        },
        blocked: {
            name: 'Blocked',
            items: [],
        },
    });

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    const handleDelete = (columnId, itemId) => {
        const column = columns[columnId];
        const newItems = column.items.filter(item => item.id !== itemId);
        setColumns({
            ...columns,
            [columnId]: {
                ...column,
                items: newItems,
            },
        });
    };

    const handleRedirect = () => {
        window.location.href = '/';
    };

    return (
        <div className='window'>
            <div className="dnd-container">
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div className="dnd-column" key={columnId}>
                                <h1 className="dnd-column-header">{column.name}</h1>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`dnd-droppable ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                            >
                                                {column.items.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`dnd-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                                                >
                                                                    {item.content}
                                                                    <button
                                                                        onClick={() => handleDelete(columnId, item.id)}
                                                                        className="delete-button"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
            <button onClick={handleRedirect}
                    className="redirect">
                Go to Home
            </button>
        </div>
    );
}

export default DndPage;