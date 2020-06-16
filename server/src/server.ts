import express from 'express';
import cors from 'cors'; 
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));  //Exemplo de mapear folder para arquivos estáticos

app.listen(3333);