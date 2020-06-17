import knex from '../../database/connection';
import jwt from 'jsonwebtoken';
import IUser from '../../Interfaces/Services/Auth/IUser';
import IBaseResponseDto from '../../Interfaces/Services/Default/IBaseResponseDto';

interface IUserService {
    findById: (id: number) => Promise<IUser>;
    findByEmail: (email:string) => Promise<IUser>;
    userExists: (email:string) => Promise<boolean>;

}
function UserService():IUserService
{
    async function findById(id: number): Promise<IUser> {
        const user = await knex('users').select("*")
        .where({ id }).first() as IUser;

        return user;
    }
    async function findByEmail(email:string): Promise<IUser> {
        const user = await knex('users').select("*")
        .where({ email }).first() as IUser;
        
        return user;
    }
    
    async function userExists(email:string): Promise<boolean> {
        const user = await knex('users').select("*")
        .where({ email }).first() as IUser;
        
        return user !== undefined;
    }

    return {
        findById,
        findByEmail,
        userExists
    }
}

export default UserService();
