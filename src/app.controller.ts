import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/cat")
export class AppController {
  constructor(private readonly appService: AppService) {} //it is injection dependence. 

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
