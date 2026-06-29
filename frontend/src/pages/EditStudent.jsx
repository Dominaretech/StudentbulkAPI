import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    uniqId: "",
    studentName: "",
    admissionId: "",
    className: "",
    section: "",
    rollNo: "",
    fatherName: "",
    fatherMobileNumber: "",
    motherName: "",
    motherMobileNumber: "",
    yearOfJoining: "",
    aadhaarNumber: "",
    gender: "",
    dateOfBirth: "",
    caste: "",
    communicationAddress: "",
    permanentAddress: "",
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/student-management/${id}`);

      const student = response.data.data;

      setForm({
        ...student,

        dateOfBirth: student.dateOfBirth?.split("T")[0] || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/student-management/${id}`, form);

      alert("Student Updated Successfully");

      navigate("/students");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div
        className="
        bg-white
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
          Edit Student
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}

          <h2
            className="
            text-xl
            font-semibold
            mb-4
            "
          >
            Basic Information
          </h2>

          <div
            className="
            grid
            grid-cols-2
            gap-4
            mb-8
            "
          >
            <div>
              <label>Uniq ID</label>

              <input
                type="text"
                value={form.uniqId}
                readOnly
                className="
                w-full
                border
                p-2
                rounded
                bg-gray-100
                "
              />
            </div>

            <div>
              <label>Student Name</label>

              <input
                type="text"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                className="
                w-full
                border
                p-2
                rounded
                "
              />
            </div>

            <div>
              <label>Gender</label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="
                w-full
                border
                p-2
                rounded
                "
              >
                <option value="">Select</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label>Date Of Birth</label>

              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="
                w-full
                border
                p-2
                rounded
                "
              />
            </div>

            <div>
              <label>Caste</label>

              <input
                type="text"
                name="caste"
                value={form.caste}
                onChange={handleChange}
                className="
                w-full
                border
                p-2
                rounded
                "
              />
            </div>
          </div>

          {/* Academic Information */}

          <h2
            className="
            text-xl
            font-semibold
            mb-4
            "
          >
            Academic Information
          </h2>

          <div
            className="
            grid
            grid-cols-2
            gap-4
            mb-8
            "
          >
            <input
              type="text"
              name="admissionId"
              placeholder="Admission ID"
              value={form.admissionId}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="className"
              placeholder="Class"
              value={form.className}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="section"
              placeholder="Section"
              value={form.section}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              value={form.rollNo}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="yearOfJoining"
              placeholder="Year Of Joining"
              value={form.yearOfJoining}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Aadhaar Number"
              value={form.aadhaarNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          {/* Parent Information */}

          <h2
            className="
            text-xl
            font-semibold
            mb-4
            "
          >
            Parent Information
          </h2>

          <div
            className="
            grid
            grid-cols-2
            gap-4
            mb-8
            "
          >
            <input
              type="text"
              name="fatherName"
              placeholder="Father Name"
              value={form.fatherName}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="fatherMobileNumber"
              placeholder="Father Mobile"
              value={form.fatherMobileNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="motherName"
              placeholder="Mother Name"
              value={form.motherName}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="motherMobileNumber"
              placeholder="Mother Mobile"
              value={form.motherMobileNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          {/* Address Information */}

          <h2
            className="
            text-xl
            font-semibold
            mb-4
            "
          >
            Address Information
          </h2>

          <div
            className="
            grid
            grid-cols-1
            gap-4
            mb-8
            "
          >
            <textarea
              name="communicationAddress"
              placeholder="Communication Address"
              value={form.communicationAddress}
              onChange={handleChange}
              rows="3"
              className="border p-2 rounded"
            />

            <textarea
              name="permanentAddress"
              placeholder="Permanent Address"
              value={form.permanentAddress}
              onChange={handleChange}
              rows="3"
              className="border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded
            "
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
