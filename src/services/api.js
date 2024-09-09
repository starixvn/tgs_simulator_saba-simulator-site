//@ts-nocheck
import axios from "axios";

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

export const getBalanceApi = async (data) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/getBalance",
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

export const settleBetApi = async (data) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/settle",
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

export const reSettleBetApi = async (data) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/resettle",
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

export const unSettleBetApi = async (data) => {
  try {
    const response = await axios.post(
      "https://saba-simulator-api.nexentgame.com/api/Simulator/unsettle",
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
