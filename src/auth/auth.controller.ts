import {Body, Controller, Inject, Post, StatusCode} from 'light-kite';
import TYPES from '../types';
import AuthService from './auth.service';

@Controller('/auth')
class AuthController {
  constructor(@Inject(TYPES.AuthService) private readonly authService: AuthService) {}
  
  @StatusCode(201)
  @Post('register')
  signUp(@Body() data: any): Promise<any> {
    return this.authService.register(data);
  }
}

export default AuthController;