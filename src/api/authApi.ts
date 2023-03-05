import api from ".";

export const signUpUserAPI = async (user: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/signup-admin", user);
  const token = response.headers["authorization"].split(" ")[1];
  localStorage.setItem("token", token);
  return response.data;
};

export const loginUserAPI = async (user: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/login-admin", user);
  const token = response.headers["authorization"].split(" ")[1];
  localStorage.setItem("token", token);
  return response.data;
};
