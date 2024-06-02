import axios from "axios";
const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
const googleMapKey = "AIzaSyAoMZaKDM1b52gc-j9aMUvngp_Flo48G6s";
const googleMapUrl = "https://maps.googleapis.com/maps/api/geocode/json";

export const getAllCardsService = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCardDetailsService = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMyCards = async () => {
  try {
    const response = await axios.get(`${apiUrl}/my-cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const likeCard = async (cardId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createCard = async (card) => {
  try {
    const { data } = await axios.post(apiUrl, card);
    return data;
  } catch (error) {
    console.error("Error making request:", error.message); // Log error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received for the request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const editCard = async (cardId, normalaizedCard) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${cardId}`, normalaizedCard);
    return data;
  } catch (error) {
    console.error("Error making request:", error.message); // Log error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received for the request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const changeLikeStatus = async (cardId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getLocationCoordinate = async (address) => {

  const params = {
    key:googleMapKey,
    address
  };

  axios.defaults.headers.common["x-auth-token"] = null

  try {
    const  response  = await axios.get(googleMapUrl, { params });
    return response.data.results[0].geometry.location;
  } catch (error) {
    throw new Error(error.message);
  }
};
