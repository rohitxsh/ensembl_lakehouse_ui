import { Routes, Route } from "react-router-dom";
import HeaderNav from "./components/headerNav";
import StepsManager from "./components/stepsManager";
import QueryStatus from "./components/queryStatus";
import ExportQuery from "./components/exportQuery";

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
      <Route
        path="/export"
        element={
          <>
            <HeaderNav />
            <ExportQuery />
          </>
        }
      />
    </Routes>
  );
}

export default App;
