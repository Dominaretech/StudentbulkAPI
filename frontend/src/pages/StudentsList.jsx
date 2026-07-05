import { useEffect, useState } from "react";
import api from "../api/axios";
import StudentTable from "../components/StudentTable";
import { exportStudents } from "../services/studentService";
function StudentsList() {

  // Students
  const [students, setStudents] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Selected Filters
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");

  // Dropdown Data
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [genders, setGenders] = useState([]);
  const [years, setYears] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  // Fetch Students
  const fetchStudents = async () => {

    try {

      const response = await api.get(

        `/student-management?page=${page}&limit=${limit}&search=${search}&class=${className}&section=${section}&gender=${gender}&year=${year}`

      );

      setStudents(response.data.data);

      setTotal(response.data.total);

    } catch (error) {

      console.error(error);

    }

  };

  // Fetch Filters
  const fetchFilters = async () => {

    try {

      const response =
        await api.get(
          "/student-management/filters"
        );

      setClasses(
        response.data.data.classes
      );

      setSections(
        response.data.data.sections
      );

      setGenders(
        response.data.data.genders
      );

      setYears(
        response.data.data.years
      );

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchStudents();

  }, [
    page,
    search,
    className,
    section,
    gender,
    year
  ]);

  useEffect(() => {

    fetchFilters();

  }, []);

  // Reset Filters
  const resetFilters = () => {

    setSearch("");

    setClassName("");

    setSection("");

    setGender("");

    setYear("");

    setPage(1);

  };

  // Delete All Students
  const handleDeleteAll = async () => {

    const confirmDelete =
      window.prompt(
        'Type "DELETE ALL" to delete all students'
      );

    if (
      confirmDelete !==
      "DELETE ALL"
    ) {

      alert("Operation Cancelled");

      return;

    }

    try {

      const response =
        await api.delete(
          "/student-management/delete-all"
        );

      alert(
        response.data.message
      );

      fetchStudents();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  };

  // Export Students
const handleExport = async () => {

  try {

    const response = await exportStudents();

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "students.xlsx";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert("Export Failed");

  }

};
  const totalPages =
    Math.ceil(total / limit);

  return (
    <div className="p-6">

  {/* Header */}

  <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Students List
  </h1>

  <div className="flex gap-3">

    <button
      onClick={handleExport}
      className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-5
      py-2
      rounded
      "
    >
      Export Excel
    </button>

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

</div>
  {/* Filters */}

  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">

    {/* Search */}

    <input
      type="text"
      placeholder="Search Student..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      className="border p-2 rounded"
    />

    {/* Class */}

    <select
      value={className}
      onChange={(e) => {
        setClassName(e.target.value);
        setPage(1);
      }}
      className="border p-2 rounded"
    >

      <option value="">
        All Classes
      </option>

      {classes.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>

    {/* Section */}

    <select
      value={section}
      onChange={(e) => {
        setSection(e.target.value);
        setPage(1);
      }}
      className="border p-2 rounded"
    >

      <option value="">
        All Sections
      </option>

      {sections.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>

    {/* Gender */}

    <select
      value={gender}
      onChange={(e) => {
        setGender(e.target.value);
        setPage(1);
      }}
      className="border p-2 rounded"
    >

      <option value="">
        All Genders
      </option>

      {genders.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>

    {/* Year */}

    <select
      value={year}
      onChange={(e) => {
        setYear(e.target.value);
        setPage(1);
      }}
      className="border p-2 rounded"
    >

      <option value="">
        All Years
      </option>

      {years.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>

    {/* Reset */}

    <button
      onClick={resetFilters}
      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      rounded
      "
    >
      Reset
    </button>

  </div>

  {/* Student Table */}

  <StudentTable
    students={students}
    refreshStudents={fetchStudents}
  />
        {/* Pagination */}

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
          bg-slate-700
          hover:bg-slate-800
          disabled:bg-gray-400
          text-white
          px-4
          py-2
          rounded
          "
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={
            page === totalPages ||
            totalPages === 0
          }
          onClick={() => setPage(page + 1)}
          className="
          bg-slate-700
          hover:bg-slate-800
          disabled:bg-gray-400
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