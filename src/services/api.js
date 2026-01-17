import axios from 'axios';
import { BASE_URL_API_SERVER } from '../constants.js';

const API_BASE_URL = BASE_URL_API_SERVER + '/api';

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

/**export const getProductList = async (token, page = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list/productos?page=${page}`, {
      headers: {
        'X-Authorization': token,
      },
    });

    console.log('Respuesta de getProductList:', response.data);

    return response.data.productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};**/

export const getProductList = async (token) => {
  const allProducts = [];
  let page = 1;
  let total = 0;

  try {
    do {
      const response = await axios.get(
        `${API_BASE_URL}/list/productos?page=${page}`,
        {
          headers: {
            'X-Authorization': token,
          },
        }
      );

      const { productos, totalRecordCount } = response.data;

      if (page === 1) {
        total = totalRecordCount;
      }

      allProducts.push(...productos);
      page++;

    } while (allProducts.length < total);

    return allProducts;

  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    throw error;
  }
};

// GUARDAR PRECIO PROVEEDOR
export const saveProductPrice = async (token, productoId, precio, fechaVigencia) => {
  if (!token || !productoId || !precio || !fechaVigencia) {
    throw new Error('Faltan datos para guardar el precio');
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/precios/agregar`,
      {
        producto: productoId,
        precio: parseFloat(precio),
        fecha_vigencia: fechaVigencia,
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
    const formData = new FormData();
    formData.append('codigo', productData.codigo);
    formData.append('nombre', productData.nombre);
    formData.append('unidad', productData.unidad);

    // Solo si hay imagen
    if (productData.foto) {
      formData.append('foto', productData.foto);
    }

    const response = await axios.post(
      `${API_BASE_URL}/productos/agregar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    const formData = new FormData();
    formData.append('codigo', productData.codigo);
    formData.append('nombre', productData.nombre);
    formData.append('unidad', productData.unidad);

    // Solo si hay imagen nueva
    if (productData.foto) {
      formData.append('foto', productData.foto);
    }

    const response = await axios.post(
      `${API_BASE_URL}/productos/editar/${productoId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

/**export const getProviderList = async (token, page = 1, start = 0) => {
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
};**/

export const getProviderList = async (token) => {
  const allProviders = [];
  let page = 1;
  let start = 0;
  let total = 0;

  try {
    do {
      const response = await axios.get(
        `${API_BASE_URL}/list/proveedores?page=${page}&start=${start}`,
        {
          headers: {
            'X-Authorization': token,
          },
        }
      );

      const { proveedores, totalRecordCount } = response.data;

      if (page === 1) {
        total = totalRecordCount;
      }

      allProviders.push(...proveedores);

      // normalmente start avanza igual al tamaño de página
      start += proveedores.length;
      page++;

    } while (allProviders.length < total);

    return allProviders;

  } catch (error) {
    console.error('Error al obtener todos los proveedores:', error);
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
        prioridad: providerData.prioridad !== undefined ? providerData.prioridad : undefined,
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

// ACTUALIZAR PRIORIDAD DE PROVEEDORES
export const updateProvidersPriority = async (token, providersWithPriority) => {
  try {
    // Actualizar cada proveedor con su nueva prioridad
    const updatePromises = providersWithPriority.map((provider) =>
      editProvider(token, provider.id, {
        id: provider.id,
        codigo: provider.codigo,
        nombre: provider.nombre || provider.company,
        prioridad: provider.prioridad,
      })
    );

    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    console.error('Error al actualizar prioridades de proveedores:', error);
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
    const payload = {
      id: userId,
      nombre: userData.username,
      perfil: userData.role === 'admin' ? -1 : 1,
      proveedor_id: userData.proveedor_id || null,
    };

    // Solo incluir clave si se proporciona una nueva contraseña
    if (userData.password) {
      payload.clave = userData.password;
    }

    const response = await axios.post(
      `${API_BASE_URL}/edit/usuarios/${userId}`,
      payload,
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



//Get cotizaciones del super
export const getCotizaciones = async (token, startDate, endDate, userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/cotizaciones/${startDate}/${endDate}/${userId}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    throw error;
  }
};


export const syncProducts = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/productos/sync`,
      {},
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al sincronizar productos:', error);
    throw error;
  }
};


export const syncProviders = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/proveedores/sync`,
      {},
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al sincronizar proveedores:', error);
    throw error;
  }
};


export const getLastProductPrice = async (token, productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/precios/ultimo/${productId}`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error al obtener precio para producto ${productId}:`, error);
    return null;
  }
};


export const getProviderProductPrices = async (token) => {
  try {
    const response = await axios.get(
       `${API_BASE_URL}/proveedor/productos/precios`,
      {
        headers: {
          'X-Authorization': token,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error al obtener precios del proveedor:', error);
    return [];
  }
};



export const analizarCotizacion = async (cotizacionId, token) => {
  if (!Number.isInteger(cotizacionId)) {
    console.warn('ID inválido en analizarCotizacion:', cotizacionId);
    console.trace();
    return null;
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/cotizaciones/analizar/${cotizacionId}`,
      {
          headers: {
          'X-Authorization': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error al analizar cotización ${cotizacionId}:`, error);
    return null;
  }
};


export const autorizarCotizacion = async (cotizacionId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cotizaciones/autorizar/${cotizacionId}`,
      {
        method: 'POST',
        headers: {
          'X-Authorization': token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    let respuestaApi = null;
    try {
      respuestaApi = JSON.parse(data.respuesta_api);
    } catch {
      respuestaApi = { message: data.respuesta_api };
    }

    return {
      ...data,
      respuesta_api: respuestaApi,
    };
  } catch (error) {
    console.error(`Error al autorizar cotización ${cotizacionId}:`, error);
    throw error;
  }
};











