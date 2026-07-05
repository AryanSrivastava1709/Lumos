import api from "./api";

export const loginOrCreateUser = async (username) => {
  const response = await api.post("/users", {
    username,
  });

  return response.data;
};
