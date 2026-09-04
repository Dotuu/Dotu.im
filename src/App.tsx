import "./App.css";
import { Background } from "./components/Background";
import { Descriptor } from "./components/Descriptor";
import { Links } from "./components/Links";
import { MeetuImage } from "./components/MeetuImage";
import { Spacer } from "./components/Spacer";
import { Typewriter } from "./components/Typewriter";

function App() {
  return (
    <>
      <Background />
      <Spacer margin={"1rem"} />
      <Typewriter
        title={"Dotu.im"}
        interval={300}
        colorFirst="#2dd4bf"
        colorSecond="#a855f7"
      />
      <Typewriter
        title={`Gamer • Developer • ${Descriptor()}`}
        interval={80}
        fontSize={"1.5rem"}
        colorFirst="#d8b4fe"
        colorSecond="#6366f1"
      />
      <Spacer margin={"1rem"} />
      <MeetuImage dim={"300px"} />
      <Links />
    </>
  );
}

export default App;
