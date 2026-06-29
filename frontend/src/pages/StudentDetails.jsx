import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function StudentDetails() {

  const { id } = useParams();

  const [student, setStudent] =
    useState(null);

  const fetchStudent =
    async () => {

      try {

        const response =
          await api.get(
            `/student-management/${id}`
          );

        setStudent(
          response.data.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    fetchStudent();

  }, []);

  if (!student) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );

  }

  return (
    <div className="p-6">

      <Link
        to="/students"
        className="
        bg-slate-700
        text-white
        px-4
        py-2
        rounded
        "
      >
        Back
      </Link>

      <div
        className="
        bg-white
        mt-6
        p-6
        rounded-lg
        shadow
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
          "
        >
          Student Details
        </h1>

        <div
          className="
          grid
          grid-cols-2
          gap-4
          "
        >

          <p><b>Uniq ID:</b> {student.uniqId}</p>

          <p><b>Student Name:</b> {student.studentName}</p>

          <p><b>Admission ID:</b> {student.admissionId}</p>

          <p><b>Class:</b> {student.className}</p>

          <p><b>Section:</b> {student.section}</p>

          <p><b>Roll No:</b> {student.rollNo}</p>

          <p><b>Father Name:</b> {student.fatherName}</p>

          <p><b>Father Mobile:</b> {student.fatherMobileNumber}</p>

          <p><b>Mother Name:</b> {student.motherName}</p>

          <p><b>Mother Mobile:</b> {student.motherMobileNumber}</p>

          <p><b>Year Of Joining:</b> {student.yearOfJoining}</p>

          <p><b>Aadhaar:</b> {student.aadhaarNumber}</p>

          <p><b>Gender:</b> {student.gender}</p>

          <p><b>Date Of Birth:</b> {student.dateOfBirth}</p>

          <p><b>Caste:</b> {student.caste}</p>

          <p><b>Communication Address:</b> {student.communicationAddress}</p>

          <p><b>Permanent Address:</b> {student.permanentAddress}</p>

        </div>

      </div>

    </div>
  );
}

export default StudentDetails;