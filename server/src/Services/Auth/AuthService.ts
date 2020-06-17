import knex from '../../database/connection';
import jwt from 'jsonwebtoken';
import IUser from '../../Interfaces/Services/Auth/IUser';
import IBaseResponseDto from '../../Interfaces/Services/Default/IBaseResponseDto';
import userService from './UserService'

interface IAuthService {
    register: (model: IUser) => Promise<IBaseResponseDto>;
    login: (model: Pick<IUser, 'email' | 'password'>) => Promise<IBaseResponseDto>;
}

function AuthService(): IAuthService
{
    async function register(model: IUser): Promise<IBaseResponseDto> {

        if(await userService.userExists(model.email)){
            return {
                sucess: false,
                message: "Usuário já existe, tente outro email"
            }
        }
        const trx = await knex.transaction();
        const id = (await trx('users').insert(model))[0];
        trx.commit();

        const user = await userService.findById(id);
        var token = GenerateJwt();

        return {
            sucess: true,
            message: "Usuário Cadastrado com sucesso",
            response: user,
            jwtToken: token
        }
    }

    async function login(model: Pick<IUser, 'email' | 'password'>): Promise<IBaseResponseDto> {

        const user = await userService.findByEmail(model.email);

        if (user?.password == model.password) {
            var token = GenerateJwt();
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

    function GenerateJwt(): string {
        var token = jwt.sign({ timestamp: new Date().getUTCMilliseconds() }, 'shhhhh', { expiresIn: 7200 });
        return token;
    }

    return { login, register}
}

export default AuthService()