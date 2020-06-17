import knex from '../../database/connection';
import jwt from 'jsonwebtoken';
import IUser from '../../Interfaces/Services/Auth/IUser';
import IBaseResponseDto from '../../Interfaces/Services/Default/IBaseResponseDto';
import {UserService} from './UserService'

export interface IAuthService {
    register(model: IUser): Promise<IBaseResponseDto>;
    login(model: Pick<IUser, 'email' | 'password'>): Promise<IBaseResponseDto>;
}

export class AuthService implements IAuthService {

    readonly userService:UserService;

    constructor(){
        this.userService = new UserService();
    }

    public async register(model: IUser): Promise<IBaseResponseDto> {

        if(await this.userService.userExists(model.email)){
            return {
                sucess: false,
                message: "Usuário já existe, tente outro email"
            }
        }
        const trx = await knex.transaction();
        const id = (await trx('users').insert(model))[0];
        trx.commit();

        const user = await this.userService.findById(id);
        var token = this.GenerateJwt();

        return {
            sucess: true,
            message: "Usuário Cadastrado com sucesso",
            response: user,
            jwtToken: token
        }
    }

    public async login(model: Pick<IUser, 'email' | 'password'>): Promise<IBaseResponseDto> {

        const user = await this.userService.findByEmail(model.email);

        if (user?.password == model.password) {
            var token = this.GenerateJwt();
            return {
                sucess: true,
                message: "Login realizado com sucesso",
                response: user,
                jwtToken: token
            }
        }
        else {
            return {
                sucess: false,
                message: "Usuário não existe / Senha incorreta"
            }
        }
    }

    private GenerateJwt(): string {
        var token = jwt.sign({ timestamp: new Date().getUTCMilliseconds() }, 'shhhhh', { expiresIn: 7200 });
        return token;
    }
}
