import api from "./api";

const chatWithLumos = async (username, message) => {
  const response = await api.post("/chat", {
    username,
    message,
  });

  return response.data;
};

export default chatWithLumos;
