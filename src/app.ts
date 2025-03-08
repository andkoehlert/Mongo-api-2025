import express, { Application } from 'express';
import dotenvFlow from 'dotenv-flow';
import cors from 'cors';
import { testConnection } from './repository/database';
import routes from './routes';
import { setupDocs } from './util/documentation';
dotenvFlow.config();

const app: Application = express();

export function startServer() {
 
  app.use(cors({
    origin: ['https://mevn2025.onrender.com', 'http://localhost:4000', 'https://mongo-api-2025.onrender.com'],
    credentials: true,
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accepts'],
  }));

  app.use(express.json());

  
  app.use('/api', routes);

setupDocs(app);

  testConnection();

  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
  });
}
