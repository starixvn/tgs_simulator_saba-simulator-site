import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getBetResultCheckApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/GetBetResultCheckByTicketId`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateBetResultCheckApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/UpdateBetResultCheck`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
