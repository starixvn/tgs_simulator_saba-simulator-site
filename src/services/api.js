//@ts-nocheck
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const placeBetParlayApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/PlaceBetParlay`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const placeBetApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/PlaceBet`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const confirmBetParlayApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/ConfirmBetParlay`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const confirmBetApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/ConfirmBet`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const canCelBetApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/CancelBet`,
      betData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBalanceApi = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/getBalance`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const settleBetApi = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/api/Simulator/settle`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const reSettleBetApi = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/resettle`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const unSettleBetApi = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/unsettle`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
