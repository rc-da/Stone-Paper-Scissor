import { useReducer } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: "🖐️",
  com: "🖐️",
  userScore: 0,
  comScore: 0,
  gameCount: 0,
  gameEnd: false,
  update: "Best of 5 Game !",
};

const signs = { 0: "✊", 1: "🖐️", 2: "✌️" };

function reducer(state, action) {
  if (state.gameEnd) {
    return state;
  }

  switch (action.type) {
    case "user":
      return { ...state, user: signs[action.payload] };

    case "com":
      return { ...state, com: signs[action.payload] };

    case "tie":
      if (state.gameCount + 1 >= 5) {
        return { ...state, gameEnd: true, update: "Game Over !" };
      }
      return { ...state, gameCount: state.gameCount + 1, update: "It's a Tie" };

    case "userScores":
      if (state.gameCount + 1 >= 5) {
        return {
          ...state,
          gameEnd: true,
          update: "Game Over !",
          userScore: state.userScore + 1,
        };
      }
      return {
        ...state,
        gameCount: state.gameCount + 1,
        update: "User scored 1 point",
        userScore: state.userScore + 1,
      };

    case "comScores":
      if (state.gameCount + 1 >= 5) {
        return {
          ...state,
          gameEnd: true,
          update: "Game Over !",
          comScore: state.comScore + 1,
        };
      }
      return {
        ...state,
        gameCount: state.gameCount + 1,
        update: "Com scored 1 point",
        comScore: state.comScore + 1,
      };

    default:
      return state;
  }
}

function GamePage() {
  const [{ user, com, userScore, comScore, gameEnd, update }, dispatch] =
    useReducer(reducer, initialState);

  const navigate = useNavigate();

  function calComSign() {
    return Math.floor(Math.random() * 3);
  }

  function handleSign(userSign) {
    const comSign = calComSign();

    dispatch({ type: "user", payload: userSign });
    dispatch({ type: "com", payload: comSign });

    if (userSign === comSign) {
      dispatch({ type: "tie" });
    } else if (
      (userSign === 0 && comSign === 2) ||
      (userSign === 1 && comSign === 0) ||
      (userSign === 2 && comSign === 1)
    ) {
      dispatch({ type: "userScores" });
    } else {
      dispatch({ type: "comScores" });
    }
  }

  if (gameEnd) {
    const winner = userScore > comScore ? "user" : "com";
    return navigate(
      `/result?winner=${winner}&uScore=${userScore}&cScore=${comScore}`,
      5000
    );
  }

  return (
    <div className="game">
      <div className="updates">
        <p>{update}</p>
      </div>
      <div className="players">
        <div className="user">
          <p>You</p>
          <p>
            Score :<i> {userScore}</i>
          </p>
          <span>{user}</span>
        </div>
        <div className="com">
          <p>Com</p>
          <p>
            Score : <i>{comScore}</i>
          </p>
          <span>{com}</span>
        </div>
      </div>

      <div className="btns">
        <Button className="handSign" onClick={() => handleSign(0)}>
          ✊
        </Button>
        <Button className="handSign" onClick={() => handleSign(1)}>
          🖐️
        </Button>
        <Button className="handSign" onClick={() => handleSign(2)}>
          ✌️
        </Button>
      </div>
    </div>
  );
}

export default GamePage;
