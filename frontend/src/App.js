
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  const handleAddOrEdit = async () => {
    if (!task) return;

    if (editId) {
      // Edit existing task
      const todoToEdit = todos.find(t => t._id === editId);
      const res = await axios.put(`http://localhost:5000/todos/${editId}`, {
        task,
        completed: todoToEdit.completed
      });
      setTodos(todos.map(t => (t._id === editId ? res.data : t)));
      setEditId(null);
    } else {
      // Add new task
      const res = await axios.post("http://localhost:5000/todos", { task });
      setTodos([...todos, res.data]);
    }

    setTask("");
  };

  const toggleTodo = async (id, completed) => {
    const todo = todos.find(t => t._id === id);
    const res = await axios.put(`http://localhost:5000/todos/${id}`, {
      task: todo.task,
      completed: !completed
    });
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const handleEdit = (todo) => {
    setTask(todo.task);
    setEditId(todo._id);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1f2937", color: "white", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>✅ To-Do List</h1>
      
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "8px", borderRadius: "5px 0 0 5px", border: "none", width: "200px" }}
        />
        <button
          onClick={handleAddOrEdit}
          style={{ padding: "8px", borderRadius: "0 5px 5px 0", border: "none", backgroundColor: "#3b82f6", color: "white" }}
        >
          {editId ? "Update" : "Add"} 
        </button>
      </div>

      <ul style={{ width: "100%", maxWidth: "400px" }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#374151", padding: "8px", borderRadius: "5px", marginBottom: "10px" }}>
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{ cursor: "pointer", textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#9ca3af" : "white" }}
            >
              {todo.task}
            </span>
            <div>
              <button
                onClick={() => handleEdit(todo)}
                style={{ marginRight: "10px", color: "#facc15", background: "none", border: "none", cursor: "pointer" }}
              >
                ✏️
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
