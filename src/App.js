import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ProctoringResults from "./pages/ProctoringResults.jsx";
import Roles from "./pages/Roles.jsx";
import Users from "./pages/Users.jsx"
import Subjects from "./pages/Subjects.jsx";
import ProctoringTypes from "./pages/ProctoringTypes.jsx";
import Proctoring from "./pages/Proctoring.jsx";
import EditResults from "./pages/EditResults.jsx";
import EditRole from "./pages/EditRole.jsx";
import CreateRole from "./pages/CreateRole.jsx";
import EditUser from "./pages/EditUser.jsx";
import CreateUser from "./pages/CreateUser.jsx";
import EditSubject from "./pages/EditSubject.jsx";
import CreateSubject from "./pages/CreateSubject.jsx";
import EditType from "./pages/EditType.jsx";
import CreateType from "./pages/CreateType.jsx";
import EditProctoring from "./pages/EditProctoring.jsx";
import CreateProctoring from "./pages/CreateProctoring.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/proctoring-results" element={<ProctoringResults />} />
        <Route path="/edit-proctoring-results/:id" element={<EditResults />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/edit-role" element={<EditRole />} />
        <Route path="/create-role" element={<CreateRole />} />

        <Route path="/users" element={<Users />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/create-user" element={<CreateUser />} />

        <Route path="/subjects" element={<Subjects />} />
        <Route path="/edit-subject" element={<EditSubject />} />
        <Route path="/create-subject" element={<CreateSubject />} />


        <Route path="/proctoring-types" element={<ProctoringTypes />} />
        <Route path="/edit-type" element={<EditType />} />
        <Route path="/create-type" element={<CreateType />} />


        <Route path="/proctoring" element={<Proctoring />} />
        <Route path="/edit-proctoring" element={<EditProctoring />} />
        <Route path="/create-proctoring" element={<CreateProctoring />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
