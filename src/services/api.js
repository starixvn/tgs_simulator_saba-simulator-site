//@ts-nocheck
import axios from "axios";

export const placeBetApi = async (betData) => {
  try {
    const response = await axios.post(
      "https://localhost:7015/api/Simulator/PlaceBet",
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

export const confirmBetApi = async (betData) => {
  try {
    const response = await axios.post(
      "https://localhost:7015/api/Simulator/ConfirmBet",
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

export const canCelBetApi = async (betData) => {
  try {
    const response = await axios.post(
      "https://localhost:7015/api/Simulator/CancelBet",
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

export const getBalance = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:7015/api/Simulator/getBalance",
      data,
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
