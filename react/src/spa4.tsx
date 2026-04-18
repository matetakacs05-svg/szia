import { useState } from "react";
import Kviz from "./oldalak/kviz";
import ToDoApp from "./oldalak/ToDoApp";
import "./App.css";

const App = () => {
  const [page, setPage] = useState<"kviz" | "todo">("kviz");

  return (
    <>
    <div className="nav">
        <nav>
            <a className="nav-item" href="/index.html">Főoldal</a>          
            <a className="nav-item" href="/java2/java2.html">Java 2</a>
            <a className="nav-item" href="/react3/dist/index.html">React 3</a>
            <a className="nav-item" href="/spa4/dist/index.html">SPA 4</a>
            <a className="nav-item" href="/fetch5/fetch5.html">Fetch 5</a>
            <a className="nav-item" href="/axios6/dist/index.html">Axios 6</a>
            <a className="nav-item" href="/oojs7/oojs7.html">OOJS 7</a>
        </nav>
    </div>
    <div className="container">
      
      <button onClick={() => setPage("kviz")}>Kvíz</button>
      <button onClick={() => setPage("todo")}>ToDo</button>

      {page === "kviz" && <Kviz />}
      {page === "todo" && <ToDoApp />}
    </div>
    </>
  );
};

export default App;