import { Routes, Route } from "react-router-dom";
import HeaderNav from "./components/headerNav";
import StepsManager from "./components/stepsManager";

function App() {
  return (
    <div className="">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<StepsManager />} />
      </Routes>
    </div>
  );
}

export default App;
