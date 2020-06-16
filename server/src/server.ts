import express from 'express';
import cors from 'cors'; 
import routes from './routes';
import path from 'path';
import  bearerToken  from 'express-bearer-token';
import jwt from 'jsonwebtoken';

const app = express();

app.use(bearerToken());
app.use(cors());
app.use(function (request, response, next) {
    try
    {
        jwt.verify(String(request.token), 'shhhhh');
        next();   
    }
    catch(error){
        return response.status(401).json({messsage: 'Token Expired'});
    }
  });
app.use(express.json());
app.use(routes);


// app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));  //Exemplo de mapear folder para arquivos estáticos

app.listen(3333);