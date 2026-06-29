import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import UploadStudents from "./pages/UploadStudents";
import StudentsList from "./pages/StudentsList";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex">
        <aside
          className="
          w-64
          bg-slate-900
          text-white
          p-4
          "
        >
          <h2
            className="
            text-xl
            font-bold
            mb-6
            "
          >
            School ERP
          </h2>

          <nav
            className="
            flex
            flex-col
            gap-3
            "
          >
            <Link to="/upload">Upload Students</Link>

            <Link to="/students">Students List</Link>
          </nav>
        </aside>

        <main
          className="
          flex-1
          bg-gray-100
          "
        >
          <Routes>
            <Route path="/upload" element={<UploadStudents />} />

            <Route path="/students" element={<StudentsList />} />

            <Route path="/students/:id" element={<StudentDetails />} />

            <Route path="/students/edit/:id" element={<EditStudent />} />
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
