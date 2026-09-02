import api from '../api/axios';
import type { Usuario } from '../types/user';

export const obtenerUsuarios = () => api.get('/users/all');

export const buscarPorApellido = (apellido: string) => api.get(`/users/buscar?apellido=${apellido}`);     

export const buscarPorRut = (rut: string) => api.get(`/users/rut/${rut}`);

export const crearUsuario = (datosUsuario: Usuario) => api.post('/users/new', datosUsuario);

export const actualizarUsuario = (rut: string, datosUsuario: Usuario) => api.put(`/users/${rut}`, datosUsuario);

export const obtenerEstadoCivil = () => api.get('/users/estado');


