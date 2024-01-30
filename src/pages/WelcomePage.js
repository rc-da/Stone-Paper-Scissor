import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <p>
        <bold>Welcome</bold>
      </p>
      <p>This is a simple Stone, Paper, Scissor game.</p>
      <Button onClick={() => navigate("/game")}>Start Game</Button>
    </div>
  );
}

export default WelcomePage;
