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
  const response = await api.post<Ilecture>(
    "/api/lectures/create-lecture",
    lecture
  );
  return response.data;
};

export const getAllAdminLecturesAPI = async () => {
  const response = await api.get("/api/lectures/my-lectures");
  return response.data;
};

export const getLectureAttendaceAPI = async (lectureId: string) => {
  const response = await api.get("/api/lectures/attendance", {
    data: {
      lectureId,
    },
  });
  return response.data;
};
