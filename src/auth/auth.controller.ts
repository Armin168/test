import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly svc: AuthService) {}

  @Get()
  index() {
    return 'hello';
  }

  @Post('login')
  login() {
    return this.svc.login();
  }

  @Post('logout')
  lgout() {
    return this.svc.logout();
  }
}
