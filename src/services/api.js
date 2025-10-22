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

//LOGOUT
export const logout = () => {
  localStorage.removeItem('jwtToken');
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


export const getProductList = async (token, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list/productos?page=${page}`, {
      headers: {
        'X-Authorization': token,
      },
    });

    return response.data.productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};


export const saveProductPrice = async (token, productoId, precio, fechaVigencia) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/precios/agregar`,
      {
        producto: productoId,
        precio: precio,
        fecha_vigencia: fechaVigencia, // ahora es dinámica
      },
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al guardar precio:', error);
    throw error;
  }
};


// AGREGAR PRODUCTOS SUPER 
export const addProduct = async (token, productData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add/productos`,
      {
        codigo: productData.codigo,
        nombre: productData.nombre,
        unidad: productData.unidad,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};
// EDITAR PRODUCTOS SUPER ADMIN
export const editProduct = async (token, productoId, productData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/edit/productos/${productoId}`,
      {
        codigo: productData.codigo,
        nombre: productData.nombre,
        unidad: productData.unidad,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al editar producto:', error);
    throw error;
  }
};


// DELETE DE SUPER PRODUCTOS
export const deleteProduct = async (token, productoId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/delete/productos/${productoId}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};


//get proveedores

export const getProviderList = async (token, page = 1, start = 0) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/list/proveedores?page=${page}&start=${start}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data.proveedores;
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    throw error;
  }
};

//ADD PROVEEEDORES
export const addProvider = async (token, providerData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add/proveedores`,
      {
        id: providerData.id || undefined, // opcional si el backend lo genera
        codigo: providerData.codigo,
        nombre: providerData.nombre,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al agregar proveedor:', error);
    throw error;
  }
};


//EDITAR PROVEEDOR

export const editProvider = async (token, providerId, providerData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/edit/proveedores/${providerId}`,
      {
        id: providerData.id || providerId,
        codigo: providerData.codigo,
        nombre: providerData.company || providerData.nombre,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al editar proveedor:', error);
    throw error;
  }
};



// DELETE PROVEEDORES
export const deleteProvider = async (token, providerId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/delete/proveedores/${providerId}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    throw error;
  }
};


//GET USUARIOS
export const getUserList = async (token, page = 1, start = 0) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/list/usuarios?page=${page}&start=${start}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data.usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};


//ADD USUARIO
export const addUser = async (token, userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add/usuarios`,
      {
        id: userData.id || undefined, // opcional si el backend lo genera
        nombre: userData.username,
        clave: userData.password,
        perfil: userData.role === 'admin' ? -1 : 1,
        proveedor_id: userData.proveedor_id || null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    throw error;
  }
};


//EDITAR USUARIO
export const editUser = async (token, userId, userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/edit/usuarios/${userId}`,
      {
        id: userId,
        nombre: userData.username,
        clave: userData.password,
        perfil: userData.role === 'admin' ? -1 : 1,
        proveedor_id: userData.proveedor_id || null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al editar usuario:', error);
    throw error;
  }
};



//DELETE USUARIO
export const deleteUser = async (token, userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/delete/usuarios/${userId}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};


//get productos con sus proveedores xd

export const getProductWithProviders = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/compras/productos`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al obtener productos con proveedores:', error);
    throw error;
  }
};





