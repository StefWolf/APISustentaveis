import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class Auth implements NestMiddleware {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {

        const token: string = req.headers['authorization'];

        if (!token) 
            return res.status(401).json({ auth: false, message: 'No token provided' })

        const existUser = await this.prisma.users.findMany({
            where: {
                JWT: token
            }
        })

        if (!existUser)
            res.status(HttpStatus.NOT_FOUND).json({
                message: 'Você não tem permissão para fazer essa ação!'
            });
            
        if (existUser[0].JWT != token)
            res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Você não tem permissão para fazer essa ação!'
            });

        next();
    }
}

