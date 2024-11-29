import {BadRequestException, HttpException, Injectable} from 'light-kite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {IUser, User} from './user.schema';
import {AuthResponseDto} from './dto/auth-response.dto';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

@Injectable()
class AuthService {
  async register(registerData: RegisterDto): Promise<AuthResponseDto> {
    const existingUser: IUser | null = await User.findOne({ username: registerData.username });

    if (existingUser) {
      throw new BadRequestException('User with this username already exists.');
    }

    const salt = await bcrypt.genSalt(10);

    const user = new User({
      ...registerData,
      password: await bcrypt.hash(registerData.password, salt)
    });
    await user.save();
    
    return this.authorize(user);
  }
  
  async login(loginData: LoginDto): Promise<AuthResponseDto> {
    const user: IUser | null = await await User.findOne({ username: loginData.username });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    return this.authorize(user);
  }

  private async authorize(user: IUser): Promise<AuthResponseDto> {
    const tokenPayload = { userId: user._id };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: '1h'});

    return { user, token };
  }
}

export default AuthService;