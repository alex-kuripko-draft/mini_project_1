import {IUser} from '../user.schema';

export class AuthResponseDto {
  token: string;
  user: IUser;
}