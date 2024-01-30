import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import GamePage from "./pages/GamePage";
import RestartPage from "./pages/RestartPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<WelcomePage />} />
          <Route index path="/game" element={<GamePage />} />
          <Route index path="/result" element={<RestartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
