import { Routes, Route } from "react-router-dom";
import HeaderNav from "./components/headerNav";
import StepsManager from "./components/stepsManager";
import QueryStatus from "./components/queryStatus";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HeaderNav />
            <StepsManager />
          </>
        }
      />
      <Route
        path="/status"
        element={
          <>
            <HeaderNav />
            <QueryStatus />
          </>
        }
      />
    </Routes>
  );
}

export default App;
