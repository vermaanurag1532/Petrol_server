import express from 'express';
import http from 'http'; // Add this
import { Server } from 'socket.io'; // Add this
import cors from 'cors';
import petrolPumpRouter from './routes/petrolPump.router.js';

const app = express();
const server = http.createServer(app); // Use this instead of app.listen
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Expose io globally or export if needed in controllers
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/PetrolPumps', petrolPumpRouter);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
