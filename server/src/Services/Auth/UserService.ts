import knex from '../../database/connection';
import jwt from 'jsonwebtoken';
import IUser from '../../Interfaces/Services/Auth/IUser';
import IBaseResponseDto from '../../Interfaces/Services/Default/IBaseResponseDto';

export interface IUserService {
    findById(id: number): Promise<IUser>;
    findByEmail(email:string): Promise<IUser>;
    userExists(email:string): Promise<boolean>;

}

export class UserService implements IUserService {
    
    public async findById(id: number): Promise<IUser> {
        const user = await knex('users').select("*")
        .where({ id }).first() as IUser;

        return user;
    }
    public async findByEmail(email:string): Promise<IUser> {
        const user = await knex('users').select("*")
        .where({ email }).first() as IUser;
        
        return user;
    }
    
    public async userExists(email:string): Promise<boolean> {
        const user = await knex('users').select("*")
        .where({ email }).first() as IUser;
        
        return user !== undefined;
    }
}
