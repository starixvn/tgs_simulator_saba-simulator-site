import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const placeBetApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/sabaPlus-PlaceBet`,
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

export const freeSpinApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/sabaPlus-FreeSpin`,
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

export const voidGameApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/sabaPlus-VoidGame`,
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

export const placeBetAndSettleApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/sabaPlus-PlaceBetAndSettle`,
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

export const endGameApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/sabaPlus-EndGame`,
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

export const getBalanceSabaPlusApi = async (betData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/Simulator/sabaPlus-getBalance`,
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
