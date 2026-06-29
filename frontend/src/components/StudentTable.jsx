import { Link } from "react-router-dom";
import api from "../api/axios";

function StudentTable({
  students,
  refreshStudents
}) {

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete Student?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await api.delete(
          `/student-management/${id}`
        );

        alert(
          "Student Deleted"
        );

        refreshStudents();

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div
      className="
      bg-white
      rounded-lg
      shadow
      overflow-x-auto
      "
    >

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3">
              Uniq ID
            </th>

            <th className="p-3">
              Student Name
            </th>

            <th className="p-3">
              Admission ID
            </th>

            <th className="p-3">
              Class
            </th>

            <th className="p-3">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {
            students.map(
              (student) => (

                <tr
                  key={student._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {student.uniqId}
                  </td>

                  <td className="p-3">
                    {student.studentName}
                  </td>

                  <td className="p-3">
                    {student.admissionId}
                  </td>

                  <td className="p-3">
                    {student.className}
                  </td>

                  <td className="p-3 flex gap-2">

                    <Link
                      to={`/students/${student._id}`}
                      className="
                      bg-blue-600
                      text-white
                      px-3
                      py-1
                      rounded
                      "
                    >
                      View
                    </Link>

                    <Link
                      to={`/students/edit/${student._id}`}
                      className="
                      bg-yellow-500
                      text-white
                      px-3
                      py-1
                      rounded
                      "
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          student._id
                        )
                      }
                      className="
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded
                      "
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>
  );
}

export default StudentTable;