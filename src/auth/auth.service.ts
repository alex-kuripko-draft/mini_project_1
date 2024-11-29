import {BadRequestException, Injectable} from 'light-kite';
import bcrypt from 'bcryptjs';
import {IUser, User} from './user.schema';

@Injectable()
class AuthService {
  async register(userData: any): Promise<IUser> {
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
    return user;
  }
}

export default AuthService;