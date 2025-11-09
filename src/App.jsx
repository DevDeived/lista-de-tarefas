import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/filter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { id: 1, text: "Criar funcionalidade X no sistema", category: "Trabalho", isCompleted: false },
          { id: 2, text: "Ir para a academia", category: "Pessoal", isCompleted: false },
          { id: 3, text: "Estudar React", category: "Estudos", isCompleted: false },
        ];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Adicionar nova tarefa
  const addTodo = (text, category) => {
    const newTodo = { id: Date.now(), text, category, isCompleted: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Remover tarefa
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Completar/desmarcar tarefa
  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Editar tarefa
  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // Filtrar e ordenar tarefas
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "All") return true;
      if (filter === "Completed") return todo.isCompleted;
      if (filter === "Incomplete") return !todo.isCompleted;
      return true;
    })
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
    );

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>

      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
          />
        ))}
      </div>

      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
