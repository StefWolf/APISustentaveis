import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from './middlewares/auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sidhfoisnodifbhosifmsdjfboixlmv',
      signOptions: { expiresIn: '86400s' },
    })
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth)
      .exclude(
        { path: 'user/login', method: RequestMethod.POST }
      )
      .forRoutes(UserController)
  }
}
