import axios from 'axios';
import { API_ENDPOINT } from 'utilities/constants';

export const fetchBoardDetail = async (id) => {
  const { data } = await axios.get(`${API_ENDPOINT}/api/v1/boards/${id}`);
  return data;
};
