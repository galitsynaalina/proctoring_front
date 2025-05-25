import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login.jsx";
import ProctoringResults from "./pages/ProctoringResults.jsx";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/proctoring-results" element={<ProctoringResults />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
