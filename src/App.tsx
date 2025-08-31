import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProctoringResults from "./pages/ProctoringResults";
import Roles from "./pages/Roles";
import Users from "./pages/Users"
import Subjects from "./pages/Subjects";
import ProctoringTypes from "./pages/ProctoringTypes";
import Proctoring from "./pages/Proctoring";
import EditResults from "./pages/EditResults";
import EditRole from "./pages/EditRole";
import CreateRole from "./pages/CreateRole";
import EditUser from "./pages/EditUser";
import CreateUser from "./pages/CreateUser";
import EditSubject from "./pages/EditSubject";
import CreateSubject from "./pages/CreateSubject";
import EditType from "./pages/EditType";
import CreateType from "./pages/CreateType";
import EditProctoring from "./pages/EditProctoring";
import CreateProctoring from "./pages/CreateProctoring";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/proctoring-results" element={<ProctoringResults />} />
        <Route path="/edit-proctoring-results/:id" element={<EditResults />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/edit-role/:id" element={<EditRole />} />
        <Route path="/create-role" element={<CreateRole />} />

        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/create-user" element={<CreateUser />} />

        <Route path="/subjects" element={<Subjects />} />
        <Route path="/edit-subject/:id" element={<EditSubject />} />
        <Route path="/create-subject" element={<CreateSubject />} />


        <Route path="/proctoring-types" element={<ProctoringTypes />} />
        <Route path="/edit-type/:id" element={<EditType />} />
        <Route path="/create-type" element={<CreateType />} />


        <Route path="/proctoring" element={<Proctoring />} />
        <Route path="/edit-proctoring/:id" element={<EditProctoring />} />
        <Route path="/create-proctoring" element={<CreateProctoring />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
