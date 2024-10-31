import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @Post('signup')
  signUp(@Body() dto: signUpDto){
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body('email') email: string, @Body('access_token') accessToken: string){
    return this.authService.signIn(email, accessToken);
  }


}
