import {BadRequestException, Injectable} from 'light-kite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {IUser, User} from './user.schema';
import {AuthResponseDto} from './dto/auth-response.dto';
import {RegisterDto} from './dto/register.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

@Injectable()
class AuthService {
  async register(userData: RegisterDto): Promise<AuthResponseDto> {
    const existingUser: IUser | null = await User.findOne({ username: userData.username });

    if (existingUser) {
      throw new BadRequestException('User with this username already exists.');
    }

    const salt = await bcrypt.genSalt(10);

    const user = new User({
      ...userData,
      password: await bcrypt.hash(userData.password, salt)
    });
    await user.save();
    
    return this.authorize(user);
  }

  private async authorize(user: IUser): Promise<AuthResponseDto> {
    const tokenPayload = { userId: user._id };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: '1h'});

    return { user, token };
  }
}

export default AuthService;