import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

function RestartPage() {
  const navigate = useNavigate();
  const [searchedParms] = useSearchParams();
  const winner = searchedParms.get("winner");
  const uScore = searchedParms.get("uScore");
  const cScore = searchedParms.get("cScore");

  return (
    <div className="restart">
      <p>
        {winner === "user" ? "Yay You won the game 🥳!!!" : "Well played 👏!"}
      </p>
      <p>
        Your Score : <i>{uScore}</i> and Com score : <i>{cScore}</i>
      </p>
      <p>
        {" "}
        Wanna play again?? Hit the <i>Play again</i> button{" "}
      </p>
      <Button onClick={() => navigate("/")}>Play again</Button>
    </div>
  );
}

export default RestartPage;
