import knex from '../database/connection';
import { Request, Response } from 'express';
import AuthService from '../Services/Auth/AuthService';
import ILoginRequestDto from '../Interfaces/Services/Auth/ILoginRequestDto';
import IRegisterRequestDto from '../Interfaces/Services/Auth/IRegisterRequestDto';

class AuthController{
    async Register (request: Request, response: Response)
    {
        const registerDto: IRegisterRequestDto = {
            name: String(request.body.name),
            lastname:  String(request.body.lastname),
            whatsapp:  String(request.body.whatsapp),
            email:  String(request.body.email),
            password:  String(request.body.password),
        }

        var register = AuthService.Register(registerDto);

        return response.json(register);       
      }

      async Login (request: Request, response: Response){

        const loginDto: ILoginRequestDto = {
            email:  String(request.body.email),
            password:  String(request.body.password),
        }

        var login = AuthService.Login(loginDto);

        return response.json(login);
      }
}

export default AuthController;