import api from "../api/axios";

export const exportStudents = async () => {
  return await api.get("/students/export", {
    responseType: "blob",
  });
};