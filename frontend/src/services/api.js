import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getTools = async () => {
  try {
    const res = await axios.get(`${API_URL}/tools`);
    return res.data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    return [];
  }
};

export const searchTools = async (query) => {
  try {
    const res = await axios.post(`${API_URL}/search`, { query });
    return res.data;
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};

export const submitTool = async (toolData) => {
  try {
    const res = await axios.post(`${API_URL}/tools`, toolData);
    return res.data;
  } catch (err) {
    console.error("Submission error:", err);
    return null;
  }
};