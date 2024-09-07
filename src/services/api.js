import axios from "axios";

// @ts-ignore
export const placeBetApi = async (betData) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/PlaceBet",
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("There was a problem with the axios operation:", error);
    throw error;
  }
};

// @ts-ignore
export const confirmBetApi = async (betData) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/ConfirmBet",
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("There was a problem with the axios operation:", error);
    throw error;
  }
};

// @ts-ignore
export const canCelBetApi = async (betData) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/CancelBet",
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("There was a problem with the axios operation:", error);
    throw error;
  }
};
