import { crearUsuario, buscarUsuarioPorApellido, buscarUsuarioPorRutModel } from "../models/user.model.js";
import type { CrearUserDTO, User } from "../types/user.types.js";

const validarCamposRequeridos = (data: CrearUserDTO): void => {
    if(
        !data.rut ||
        !data.nombres ||
        !data.apellidos ||
        !data.regionId ||
        !data.ciudadId ||
        !data.direccion ||
        !data.telefono ||
        !data.email ||
        !data.fechaNacimiento ||
        !data.estadoCivilId
    ){
        throw new Error('Todos los campos obligatorios deben ser ingresados')
    }
};

const validarRut = (rut: string): void => {
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if(!rutRegex.test(rut)){
        throw new Error('Formato de RUT no válido');
    }
};

const validarTelefono = (telefono: string): void => {
    const telefonoRegex = /^(\+?56)?9\d{8}$/;
    if(!telefonoRegex.test(telefono)){
        throw new Error('Formato de número de teléfono no válido');
    }
};

const validarEmail = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        throw new Error('Formato de email no válido');
    }
};

const validarFecha = (fechaNacimiento: string): void => {
    const date = new Date(fechaNacimiento);
    const today = new Date();

    if(isNaN(date.getTime())){
        throw new Error('La fecha de nacimiento no es válida');
    }
    if(date > today){
        throw new Error('La fecha de nacimiento no puede ser futura');
    }
};

export const crearUserService = async (data: CrearUserDTO) => {
    validarCamposRequeridos(data);
    validarRut(data.rut);
    validarTelefono(data.telefono);
    validarEmail(data.email);
    validarFecha(data.fechaNacimiento);

    const user = await crearUsuario(data);
    return user;
};

export const buscarUserPorApellidoService = async (apellido: string):Promise<User[]>  => {
    if (!apellido|| apellido.trim() === '') {
            throw new Error('El término de búsqueda no puede estar vacío');
        }

        
        const terminoLimpio = apellido.trim();

        const regexApellidos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (!regexApellidos.test(terminoLimpio)) {
            throw new Error('El apellido contiene caracteres no válidos. Solo se permiten letras y espacios.');
        }

        const usuariosEncontrados = await buscarUsuarioPorApellido(terminoLimpio);

        return usuariosEncontrados;
};

export const buscarUsuarioPorRutService = async (rutParam: string): Promise<User | null> => {
    if (!rutParam || rutParam.trim() === '') {
        throw new Error('El RUT no puede estar vacío');
    }

    const rutLimpio = rutParam.replace(/\./g, '').replace(/\s/g, '').toUpperCase();
    
    const regexFormato = /^[0-9]{7,8}-[0-9K]$/;
    if (!regexFormato.test(rutLimpio)) {
        throw new Error('El formato del RUT no es válido');
    }
    const usuarioEncontrado = await buscarUsuarioPorRutModel(rutLimpio);

    return usuarioEncontrado;
};