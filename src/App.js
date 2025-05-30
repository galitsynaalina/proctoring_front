import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login.jsx";
import ProctoringResults from "./pages/ProctoringResults.jsx";
import RolesList from "./pages/RolesList.jsx";
import Users from "./pages/Users.jsx"
import Subjects from "./pages/Subjects.jsx";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/proctoring-results" element={<ProctoringResults />} />
      <Route path="/roles-list" element={<RolesList />} />
      <Route path="/users" element={<Users />} />
      <Route path="/subjects" element={<Subjects />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
