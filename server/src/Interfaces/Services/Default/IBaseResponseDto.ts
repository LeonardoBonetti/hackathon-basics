export default interface IBaseResponseDto{
   sucess: boolean;
   message: string;
   response?: any;
   jwtToken?: string;
}