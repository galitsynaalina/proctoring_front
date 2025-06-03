import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login.jsx";
import ProctoringResults from "./pages/ProctoringResults.jsx";
import Roles from "./pages/Roles.jsx";
import Users from "./pages/Users.jsx"
import Subjects from "./pages/Subjects.jsx";
import ProctoringTypes from "./pages/ProctoringTypes.jsx";
import Proctoring from "./pages/Proctoring.jsx";
import EditResults from "./pages/EditResults.jsx";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/proctoring-results" element={<ProctoringResults />} />
      <Route path="/edit-proctoring-results" element={<EditResults />} />

      <Route path="/roles" element={<Roles />} />
      <Route path="/users" element={<Users />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/proctoring-types" element={<ProctoringTypes />} />
      <Route path="/proctoring" element={<Proctoring />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
