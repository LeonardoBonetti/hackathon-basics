import knex from '../database/connection';
import { Request, Response } from 'express';
import {AuthService} from '../Services/Auth/AuthService';
import IUser from '../Interfaces/Services/Auth/IUser';
import IBaseResponseDto from '../Interfaces/Services/Default/IBaseResponseDto';

class AuthController
{
    async Register (request: Request, response: Response)
    {
        const registerDto: IUser = {
            name: String(request.body.name),
            lastname: String(request.body.lastname),
            whatsapp: String(request.body.whatsapp),
            email: String(request.body.email),
            password: String(request.body.password),
        }

        var register = await new AuthService().register(registerDto);
        
        if(register.sucess){
            return response.json(register);       
        }
        else{
            return response.status(500).json(register)
        }
    }

      async Login (request: Request, response: Response){

        const loginDto: Pick<IUser, 'email' | 'password'> = {
            email:  String(request.body.email),
            password:  String(request.body.password),
        }

        var login = await new AuthService().login(loginDto);

        if(login.sucess){
            return response.json(login);       
        }
        else{
            return response.status(500).json(login)
        }
      }
}

export default AuthController;