import api from ".";

interface Ilecture {
  adminId: number;
  lectureId: string;
  courseName: string;
  courseCode: string;
}

export const createLectureAPI = async (lecture: {
  courseName: string;
  courseCode: string;
  validityPeriod: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await api.post<Ilecture>(
    "/api/lectures/create-lecture",
    lecture,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getAllAdminLecturesAPI = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/api/lectures/my-lectures", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getLectureAttendaceAPI = async (lectureId: string) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/api/lectures/attendance/${lectureId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
