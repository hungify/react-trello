import axios from 'axios';
import { API_ENDPOINT } from 'utilities/constants';

export const fetchBoardDetail = async (id) => {
  const response = await axios.get(`${API_ENDPOINT}/api/v1/boards/${id}`);
  return response.data;
};

export const createNewColumn = async (data) => {
  const response = await axios.post(`${API_ENDPOINT}/api/v1/columns`, data);
  return response.data;
};
// Update or remove column
export const updateColumn = async (id, data) => {
  const response = await axios.put(
    `${API_ENDPOINT}/api/v1/columns/${id}`,
    data
  );
  return response.data;
};

export const createNewCard = async (data) => {
  const response = await axios.post(`${API_ENDPOINT}/api/v1/cards`, data);
  return response.data;
};
