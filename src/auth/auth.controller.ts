import {Body, Controller, Inject, Post, StatusCode, ValidateDto} from 'light-kite';
import TYPES from '../types';
import AuthService from './auth.service';
import {AuthResponseDto} from './dto/auth-response.dto';
import {RegisterDto} from './dto/register.dto';

@Controller('/auth')
class AuthController {
  constructor(@Inject(TYPES.AuthService) private readonly authService: AuthService) {}
  
  @ValidateDto(RegisterDto)
  @StatusCode(201)
  @Post('register')
  register(@Body() data: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(data);
  }
}

export default AuthController;