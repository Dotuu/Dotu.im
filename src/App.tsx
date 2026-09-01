import "./App.css";
import { Background } from "./components/Background";
import { MeetuImage } from "./components/MeetuImage";

function App() {
  return (
    <>
      <Background />
      <MeetuImage dim={"300px"} />
    </>
  );
}

export default App;
