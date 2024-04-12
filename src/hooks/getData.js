import axios from 'axios';
const baseURL= process.env.REACT_APP_BASH
const fetchData = async ({url}) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/${url}`,
  );
  return response.data;
};

export default fetchData
