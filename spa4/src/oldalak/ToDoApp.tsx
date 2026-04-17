import { useState, useEffect } from "react";

type Task = {
  text: string;
  done: boolean;
  timeLeft?: number;
  expired?: boolean;
};

export default function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.timeLeft !== undefined && task.timeLeft > 0) {
            if (task.timeLeft === 1) {
              setMessage(`Lejárt: ${task.text}`);

              return {
                ...task,
                timeLeft: 0,
                expired: true,
              };
            }

            return {
              ...task,
              timeLeft: task.timeLeft - 1,
            };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (input.trim() === "") return;

    const time = parseInt(timeInput);

    setTasks([
      ...tasks,
      {
        text: input,
        done: false,
        timeLeft: time > 0 ? time : undefined,
        expired: false,
      },
    ]);

    setInput("");
    setTimeInput("");
  };

  const toggleDone = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>To-Do Lista</h2>

      {/* MESSAGE */}
      {message && <p className="message">{message}</p>}

      <input
        placeholder="Feladat..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input
        type="number"
        min="1"
        placeholder="idő (mp)"
        value={timeInput}
        onChange={(e) => setTimeInput(e.target.value)}
      />

      <button onClick={addTask}>Hozzáadás</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => toggleDone(index)}
              className={task.expired ? "expired" : ""}
              style={{
                textDecoration: task.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>

            {task.timeLeft !== undefined && (
              <span> ({formatTime(task.timeLeft)})</span>
            )}

            <button onClick={() => deleteTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}