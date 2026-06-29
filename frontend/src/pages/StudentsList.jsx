import { useEffect, useState } from "react";
import api from "../api/axios";
import StudentTable from "../components/StudentTable";

function StudentsList() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const fetchStudents = async () => {
    try {

      const response = await api.get(
        `/student-management?page=${page}&limit=${limit}&search=${search}`
      );

      setStudents(response.data.data);
      setTotal(response.data.total);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const handleDeleteAll = async () => {

    const confirmDelete = window.prompt(
      'Type "DELETE ALL" to delete all students'
    );

    if (confirmDelete !== "DELETE ALL") {
      alert("Operation Cancelled");
      return;
    }

    try {

      const response = await api.delete(
        "/student-management/delete-all"
      );

      alert(response.data.message);

      fetchStudents();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Students List
        </h1>

        <button
          onClick={handleDeleteAll}
          className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-5
          py-2
          rounded
          "
        >
          Delete All Students
        </button>

      </div>

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
          border
          p-2
          rounded
          w-72
          "
        />

      </div>

      <StudentTable
        students={students}
        refreshStudents={fetchStudents}
      />

      <div className="flex gap-3 mt-6">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="
          bg-slate-700
          text-white
          px-4
          py-2
          rounded
          "
        >
          Previous
        </button>

        <span className="py-2">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={
            page === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setPage(page + 1)
          }
          className="
          bg-slate-700
          text-white
          px-4
          py-2
          rounded
          "
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default StudentsList;