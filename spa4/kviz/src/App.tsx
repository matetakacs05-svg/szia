import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [startTime, setStartTime] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);

  const [lastResult, setLastResult] = useState<string | null>(null);
  const [waitingNext, setWaitingNext] = useState(false);

  const activeCountries2026 = [
    "Monaco",
    "Nagy-Britannia",
    "Olaszország",
    "Ausztria",
    "Japán",
    "Belgium",
    "Magyarország",
    "Spanyolország",
    "USA",
    "Bahrain",
    "Kína",
    "Mexikó",
    "Kanada",
    "Ausztrália",
    "Brazília",
    "Hollandia"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("gp.txt");
      const data = (await response.text())
        .split("\n")
        .slice(1)
        .map(line => line.split("\t")[2]);

      setCountries(data);
    };

    fetchData();
  }, []);

  const nextRound = () => {
    if (round >= 10) {
      setGameOver(true);
      return;
    }

    const random =
      countries[Math.floor(Math.random() * countries.length)];

    setCurrent(random);
    setRound(prev => prev + 1);
    setTimeLeft(10);
    setStartTime(Date.now());
    setLastResult(null);
    setWaitingNext(false);
  };

  useEffect(() => {
    if (!current || gameOver || waitingNext) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setLastResult(" Time's up! 0 points");
          setWaitingNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [current, waitingNext]);

  const guess = (answer: boolean) => {
    if (!current || waitingNext) return;

    const isCorrect = activeCountries2026.includes(current);
    const timeTaken = (Date.now() - startTime) / 1000;

    let points = 0;

    if (answer === isCorrect) {
      if (timeTaken < 5) points = 2;
      else points = 1;
    }

    setScore(prev => prev + points);

    setLastResult(
      `${answer === isCorrect ? "✅ Correct" : "❌ Wrong"} | +${points} points`
    );

    setWaitingNext(true);
  };

  useEffect(() => {
    if (countries.length > 0 && round === 0) {
      nextRound();
    }
  }, [countries]);

  const newGame = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
    setCurrent(null);
    setLastResult(null);
    setWaitingNext(false);
  };

  return (
    <main>
      <h1>F1 Quiz</h1>

      {gameOver ? (
        <>
          <h2>Game Over! Final Score: {score}</h2>
          <button onClick={newGame}>New Game</button>
        </>
      ) : (
        <>
          <h2>Round: {round}/10</h2>
          <h3>Time left: {timeLeft}s</h3>

          <h2>{current}</h2>

          {!waitingNext && (
            <>
              <button onClick={() => guess(true)}>Still host</button>
              <button onClick={() => guess(false)}>Not host</button>
            </>
          )}

          {lastResult && <h3>{lastResult}</h3>}

          {waitingNext && (
            <button onClick={nextRound}>Next</button>
          )}

          <h3>Score: {score}</h3>
        </>
      )}
    </main>
  );
}

export default App;