import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import direccionRoutes from './routes/direccion.routes.js';

const app = express();

const dominiosPermitidos = [
  'http://localhost:5173', 
  'https://tu-proyecto.vercel.app' // REEMPLAZAR
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/users/', userRoutes);
app.use('/direccion/', direccionRoutes);

export default app;