import { useState } from "react";

export default function App() {
  const [isGame, setIsGame] = useState(true);
  const [isGameOn, setIsGameOn] = useState(false);
  return (
    <div className="app">
      {!isGameOn ? (
        <GameCard>
          {isGame ? "Welcome to Stone Paper !!" : "Would Like Play ??"}
          <span>
            <Button onClick={() => setIsGameOn((game) => !game)}>
              {isGame ? "Start" : "Start again"}
            </Button>
          </span>
        </GameCard>
      ) : (
        <Game setIsGame={setIsGame} setIsGameOn={setIsGameOn} />
      )}
    </div>
  );
}

function GameCard({ children }) {
  return (
    <div className="game-card">
      <p>{children}</p>
    </div>
  );
}

function Game({ setIsGame, setIsGameOn }) {
  const [userChoice, setUserChoice] = useState(0);
  const [comChoice, setComChoice] = useState(0);
  const [state, setState] = useState("Start Game");
  const [count, setCount] = useState(0);
  const [userPoint, setUserPoint] = useState(0);
  const [comPoint, setCompoint] = useState(0);

  function computerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    return randomNumber;
  }

  function handleButton(choice) {
    const newComChoice = computerChoice();
    setUserChoice((userChoice) => choice);
    setComChoice((comChoice) => newComChoice);
    setCount((c) => c + 1);

    if (choice === newComChoice) setState("It's a Tie");
    else if (
      (choice === 1 && newComChoice === 0) ||
      (choice === 0 && newComChoice === 2)
    ) {
      setState("You won 1 point");
      setUserPoint((userPoint) => userPoint + 1);
    } else {
      setState("Computer won 1 point");
      setCompoint((comPoint) => comPoint + 1);
    }
  }

  return count < 5 ? (
    <div className="game">
      <p className="p">{state}</p>
      <div className="content">
        <p>
          You {userPoint} points
          <span>
            {userChoice === 0 ? (
              <img src="./img/scissor.png" alt="scissor" />
            ) : userChoice === 1 ? (
              <img src="./img/stone.png" alt="stone" />
            ) : (
              <img src="./img/paper.png" alt="paper" />
            )}
          </span>
        </p>

        <p>
          Computer {comPoint} points
          <span>
            {comChoice === 0 ? (
              <img src="./img/scissor.png" alt="scissor" />
            ) : comChoice === 1 ? (
              <img src="./img/stone.png" alt="stone" />
            ) : (
              <img src="./img/paper.png" alt="paper" />
            )}
          </span>
        </p>
      </div>

      <div className="buttons">
        <Button onClick={() => handleButton(1)}>Stone</Button>
        <Button onClick={() => handleButton(2)}>Paper</Button>
        <Button onClick={() => handleButton(0)}>Scissor</Button>
      </div>
    </div>
  ) : (
    <>
      {userPoint > comPoint
        ? "You Won !"
        : userPoint < comPoint
        ? "Computer Won !"
        : "Its a Tie"}
      {setTimeout(() => {
        setIsGame(false);
        setIsGameOn(false);
      }, 2000)}
    </>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
