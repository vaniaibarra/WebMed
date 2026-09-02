import request from 'supertest';
import app from '../app.js';
import { pool } from '../database/db.js'; 
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('Tests de Integración - Rutas de Usuarios', () => {

    
    const usuarioParaCrear = {
        rut: "20444555-9",
        nombres: "Vania",
        apellidos: "Ibarra",
        direccion: "Avenida Libertad 123",
        regionId: 6,
        ciudadId: 17, 
        telefono: "912345678",
        email: "vania@test.com",
        fechaNacimiento: "1998-05-10",
        estadoCivilId: 1,
        comentarios: "Usuario creado desde Jest POST"
    };

   
    const usuarioParaBuscar = {
        rut: "19111222-3",
        nombres: "Juan",
        apellidos: "Perez", 
        direccion: "Calle Falsa 123",
        regionId: 6,
        ciudadId: 17,
        telefono: "987654321",
        email: "juan@test.com",
        fechaNacimiento: "1990-01-01",
        estadoCivilId: 1,
        comentarios: "Usuario inyectado para GET"
    };

    

    beforeAll(async () => {
        
        await pool.query(`DELETE FROM users WHERE rut IN ($1, $2)`, [usuarioParaCrear.rut, usuarioParaBuscar.rut]);

        
        const queryInsert = `
            INSERT INTO users (rut, nombres, apellidos, direccion, region_id, ciudad_id, telefono, email, fecha_nacimiento, estado_civil_id, comentarios)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        const values = [
            usuarioParaBuscar.rut, usuarioParaBuscar.nombres, usuarioParaBuscar.apellidos,
            usuarioParaBuscar.direccion, usuarioParaBuscar.regionId, usuarioParaBuscar.ciudadId,
            usuarioParaBuscar.telefono, usuarioParaBuscar.email, usuarioParaBuscar.fechaNacimiento,
            usuarioParaBuscar.estadoCivilId, usuarioParaBuscar.comentarios
        ];
        await pool.query(queryInsert, values);
    });

    afterAll(async () => {
       
        await pool.query(`DELETE FROM users WHERE rut IN ($1, $2)`, [usuarioParaCrear.rut, usuarioParaBuscar.rut]);
        
        
        await pool.end();
    });

    
    describe('POST /users/new', () => {
        it('Debería retornar status 400 si el RUT tiene un formato incorrecto', async () => {
            const usuarioMalo = { ...usuarioParaCrear, rut: "123-A" };
            const response = await request(app).post('/users/new').send(usuarioMalo);

            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/formato/i);
        });

        it('Debería retornar status 400 si el teléfono contiene letras', async () => {
            const usuarioMalo = { ...usuarioParaCrear, telefono: "569letras12" };
            const response = await request(app).post('/users/new').send(usuarioMalo);

            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/teléfono/i);
        });

        it('Debería retornar status 400 si la fecha de nacimiento es futura', async () => {
            const usuarioMalo = { ...usuarioParaCrear, fechaNacimiento: "2050-01-01" };
            const response = await request(app).post('/users/new').send(usuarioMalo);

            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/futura/i);
        });

        it('Debería crear el usuario exitosamente y retornar status 200/201', async () => {
            const response = await request(app).post('/users/new').send(usuarioParaCrear);

            expect([200, 201]).toContain(response.status);
            expect(response.body).toHaveProperty('rut', usuarioParaCrear.rut);
        });
    });

   
    describe('GET /users/rut/:rut', () => {
        it('Debería retornar status 400 si el formato del RUT es inválido', async () => {
            const response = await request(app).get('/users/rut/123-A');
            
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/formato/i);
        });

        it('Debería retornar status 404 si el RUT es válido pero no existe', async () => {
            const response = await request(app).get('/users/rut/11111111-1'); 
            
            expect(response.status).toBe(404);
            expect(response.body.message).toMatch(/no registrado/i);
        });

        it('Debería retornar el usuario y status 200 si el RUT existe', async () => {
            const response = await request(app).get(`/users/rut/${usuarioParaBuscar.rut}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('rut', usuarioParaBuscar.rut);
            expect(response.body).toHaveProperty('nombres', usuarioParaBuscar.nombres);
        });
    });

   
    describe('GET /users/buscar', () => {
        it('Debería retornar status 400 si el apellido contiene caracteres inválidos', async () => {
            
            const response = await request(app).get('/users/buscar?apellido=Perez123');
            
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/caracteres/i);
        });

        it('Debería retornar un arreglo vacío si el apellido no existe', async () => {
            const response = await request(app).get('/users/buscar?apellido=ApellidoQueNoExiste');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });

        it('Debería retornar un arreglo con usuarios si el apellido coincide', async () => {
            const response = await request(app).get(`/users/buscar?apellido=${usuarioParaBuscar.apellidos}`);
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('apellidos', usuarioParaBuscar.apellidos);
        });
    });

});