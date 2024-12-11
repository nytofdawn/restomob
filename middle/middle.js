import axios from "axios";

const API_URL = 'http://192.168.1.11:3000';


// Signup function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/Login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error during login:', error.response.data);
      throw error.response.data;  // Send back specific error message
    } else {
      console.error('Error during login:', error.message);
      throw error;
    }
  }
};

export const fetchFoodItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/items`);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const fetchTables = async () => {
  try {
    console.log('Fetching tables...');
    const response = await axios.get(`${API_URL}/api/tables`); // Use the correct IP
    console.log('Response:', response.data); // Log the response
    return response.data; // Return the table data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch table data');
  }
};

