import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationTodoList from "./assets/animations/animationTodoList.json"; // Import the animation data file here
import todoMain from "./assets/animations/todoMain.json"; // Import the animation data file here
import "./App.css";

// TodoApp component
function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { text: "Task1", id: 1, completed: false },
    { text: "Task2", id: 2, completed: false },
    { text: "Task3", id: 3, completed: false },
  ]);
  const [deletedList, setDeletedList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { text: todo, id: Date.now(), completed: false }]);
      setTodo("");
    }
  };

  const handleRemove = (deleteId) => {
    const deletedTodo = todos.find((todo) => todo.id === deleteId);
    setDeletedList([...deletedList, deletedTodo]);

    const updatedList = todos.filter((todo) => todo.id !== deleteId);
    setTodos(updatedList);
  };

  const handleToggle = (toggleId) => {
    const updatedList = todos.map((todo) =>
      todo.id === toggleId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedList);
  };

  const handleEdit = (editId) => {
    setEditIndex(editId);
    setEditedTodo(todos.find((todo) => todo.id === editId).text);
  };

  const handleSave = (saveId) => {
    const updatedList = todos.map((todo) =>
      todo.id === saveId ? { ...todo, text: editedTodo } : todo
    );
    setTodos(updatedList);
    setEditIndex(null);
    setEditedTodo("");
  };

  // Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationTodoList, // Import the animation file here
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      <h2>Your Tasks</h2>
      <ul className="task-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`task-item ${todo.completed ? "completed-task" : ""}`}
          >
            {editIndex === todo.id ? (
              <input
                type="text"
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
            ) : (
              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.text}
              </span>
            )}

            <div className="task-actions">
              {editIndex === todo.id ? (
                <button onClick={() => handleSave(todo.id)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
              )}
              <button
                onClick={() => handleRemove(todo.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul className="completed-list">
        {deletedList.map((todo) => (
          <li key={todo.id} className="task-item completed-task">
            {todo.text}
          </li>
        ))}
      </ul>

      <div className="lottie-container">
        <Lottie options={lottieOptions} height={400} width={400} />
      </div>
    </div>
  );
}

// Home page component
function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Todo App!</h2><br />
      <p>Stay organized and track your tasks easily!</p><br /><br />
      <Link to="/todos" className="start-btn">
        Get Started
      </Link>

      {/* Lottie Animation */}
      <div className="lottie-container">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: todoMain,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={400}
          width={400}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/todos" className="nav-link">
                Todo List
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
