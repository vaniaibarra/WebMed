import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import direccionRoutes from './routes/direccion.routes.js';

const app = express();

const dominiosPermitidos = [
  'http://localhost:5173', 
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || dominiosPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      
      console.error(`🚨 CORS BLOQUEADO: El origen '${origin}' no está en la lista:`, dominiosPermitidos);
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