import Popup from "./components/UI/Popup";
import { gameLoop } from "./engine";
import "./index.css";

function App() {
  const handleStart = () => {
    const btn = document.getElementById("start-btn")!;
    btn.remove();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const screen = document.getElementById("screen")!;
    screen.style.display = "block";
    gameLoop();
  };

  return (
    <div>
      <div id="screen"></div>
      <div id="hud">0/0</div>
      <button onClick={handleStart} id="start-btn">
      Play my game if you want to know about me!
      </button>
    </div>
  );
}

export default App;
