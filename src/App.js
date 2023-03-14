import './App.css';
import React from "react";


function App() {
    const [enabledTodos, setEnabledTodos] = React.useState([]);
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    React.useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(), //gera um id unico utilizando a data atual, nunca se repete
            text: todo,
            completed: false,
        };
        setTodos([...todos].concat(newTodo));
        setEnabledTodos([...todos].concat(newTodo));
        setTodo("");
    }

    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function getAllTodos() {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setEnabledTodos(loadedTodos);
        }

    }

    function submitEdits(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    function listCompleted() {
        let updatedTodos = [...todos].filter((todo) => todo.completed === true);
        setEnabledTodos(updatedTodos);
    }

    function listNotCompleted() {
        let updatedTodos = [...todos].filter((todo) => todo.completed === false);
        setEnabledTodos(updatedTodos);
    }

    return (

        <div className="App">
            <h1>Lista de Tarefas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="taskField"
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                />
                <button type="submit" className="taskButton">Adicionar Tarefa</button>
            </form>
            <div className="filterButtons">
                <button onClick={() => listCompleted()}>Completas</button>
                <button onClick={() => getAllTodos()}>Todas as tarefas</button>
                <button onClick={() => listNotCompleted()}>Incompletas</button>
            </div>
            {enabledTodos.map((todo) => (
                <div className="todoText">
                    <input
                        type="checkbox"
                        id="completed"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                    />
                    {todo.id === todoEditing ? (
                        <input
                            type="text"
                            onChange={(e) => setEditingText(e.target.value)}
                        />
                    ) : (
                        <div>{todo.text}</div>
                    )}
                    <div className="todoMiniButtons">
                        {todo.id === todoEditing ? (
                            <button onClick={() => submitEdits(todo.id)}>Finalizar Edições</button>
                        ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>Editar</button>
                        )}
                        <button onClick={() => deleteTodo(todo.id)}>Deletar</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
