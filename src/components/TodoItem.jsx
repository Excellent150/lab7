import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo}) {
    return (
        <div class='checkbox'>
            <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
    );
}

export default TodoItem;