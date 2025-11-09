import { useState } from "react";

const Todo = ({ todo, removeTodo, completeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim() === "") return;
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className="content">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        ) : (
          <>
            <p>{todo.text}</p>
            <p className="category">({todo.category})</p>
          </>
        )}
      </div>

      <div>
        <button className="complete" onClick={() => completeTodo(todo.id)}>
          {todo.isCompleted ? "Desmarcar" : "Completar"}
        </button>

        <button className="remove" onClick={() => removeTodo(todo.id)}>X</button>

        {isEditing ? (
          <button onClick={handleSave}>Salvar</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
      </div>
    </div>
  );
};

export default Todo;
