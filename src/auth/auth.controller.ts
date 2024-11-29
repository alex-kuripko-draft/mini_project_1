import {Controller, Get} from 'light-kite';

@Controller('/auth')
class AuthController {
  @Get()
  test() {
    return 'test'
  }
}

export default AuthController;