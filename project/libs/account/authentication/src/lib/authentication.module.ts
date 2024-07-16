import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule, BlogUserRepository } from '@project/blog-user'

@Module({
  imports: [BlogUserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {
  constructor(
    private readonly blogUserRepsitory: BlogUserRepository
  ) {}
}
