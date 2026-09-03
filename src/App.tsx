import "./App.css";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { MeetuImage } from "./components/MeetuImage";

function App() {
  return (
    <>
      <Header />
      <Background />
      <MeetuImage dim={"300px"} />
    </>
  );
}

export default App;
