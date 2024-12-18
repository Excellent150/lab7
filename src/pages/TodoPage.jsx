import React, { useState } from 'react';
import TodoList from '../components/TodoList';

function TodoPage() {

    const [filter, setFilter] = useState('all');

    const [todos, setTodos] = useState([
        { id: 1, title: 'Buy groceries', completed: true },
        { id: 2, title: 'Read a book', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {
                ...todo, completed: !todo.completed
            } : todo
            )
        );
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo) return;

        const newTodoItem = {
            id: Date.now(),
            title: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id != id));
    }

    const filteredTodos = () => {
        if (filter === 'completed') {
            return todos.filter(todo => todo.completed);
        } else if (filter === 'active') {
            return todos.filter(todo => !todo.completed);
        }
        return todos;
    };

    const handleRedirect = () => {
        window.location.href = '/dnd';
    };

    return (
        <div>
            <div>
                <h1>My To-Do List</h1>
                <div class='input'>
                    <form onSubmit={addTodo}>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Add new task..."
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <div class='buttons'>
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('active')}>Active</button>
                    <button onClick={() => setFilter('completed')}>Done</button>
                </div>
                <TodoList todos={filteredTodos()} toggleTodo={toggleTodo} removeTodo={removeTodo} />
            </div>
            <button onClick={handleRedirect}
                    className='redirect'>
                Go to DnD
            </button>
        </div>
    );
}

export default TodoPage;