import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

/**
 * Para endpoints com GET
 */
@Injectable()
export class Auth implements NestMiddleware {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {

        if (req.method == 'GET') {

            const { JWT, userId } = req.query

            const existUser = await this.prisma.users.findUnique({
                where: {
                    id: Number(userId)
                }
            })

            if (existUser) {
                if (existUser.JWT === JWT) {
                    next();
                } else {
                    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Você não tem permissão para fazer essa ação!' });
                }
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuário não encontrado' });
            }

        } else if (req.method == 'POST') {

            const { JWT, userId } = req.body

            const existUser = await this.prisma.users.findUnique({
                where: {
                    id: Number(userId)
                }
            })

            if (existUser) {
                if (existUser.JWT === JWT) {
                    next();
                } else {
                    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Você não tem permissão para fazer essa ação!' });
                }
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuário não encontrado' });
            }

        } else {
            res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'Método não permitido' });
        }

    }
}

