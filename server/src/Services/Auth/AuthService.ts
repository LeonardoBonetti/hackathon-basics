import knex from '../../database/connection';
import ILogin from "../../Interfaces/Services/Auth/ILoginRequestDto";
import IRegisterRequestDto from '../../Interfaces/Services/Auth/IRegisterRequestDto';
import ILoginRequestDto from '../../Interfaces/Services/Auth/ILoginRequestDto';
import IBaseResponseDto from '../../Interfaces/Services/Default/IBaseResponseDto';


function AuthService() {
    async function  Register(model: IRegisterRequestDto): Promise<IBaseResponseDto>{
        const trx = await knex.transaction();
        const id = (await trx('users').insert(model))[0];
        trx.commit();
        return {
            sucess: true,
            message : "Sucesso"
        }
    }

    async function Login(model: ILoginRequestDto): Promise<IBaseResponseDto>{
        const user = await knex('users').select("*").where(model).first();

        if(user == undefined){
           return {
               sucess: false,
               message: "User Dont Exists"
           }
        }
        else{
            return {
                sucess: false,
                message: "User Dont Exists",
                response: user
            }
        }
    }

    return {
        Register,
        Login
    }
}


export default AuthService();