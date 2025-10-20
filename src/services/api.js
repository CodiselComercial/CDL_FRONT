import axios from 'axios';

const API_BASE_URL = 'https://arxsoftware.cloud/pedidoscodisel/api';

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      new URLSearchParams({ username, password }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Return the JWT token
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Get user data function
export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuario/datos`, {
      headers: {
        'X-Authorization': token,
      },
    });

    // Return user data
    return response.data;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
};