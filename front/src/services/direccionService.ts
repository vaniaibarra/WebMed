import api from '../api/axios';

export const obtenerRegiones = () => api.get('/direccion/regiones');

export const obtenerCiudades = () => api.get('/direccion/ciudades');