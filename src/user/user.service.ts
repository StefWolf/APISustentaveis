import { Injectable } from "@nestjs/common";
import { Users, Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async findUser(
        user: Prisma.UsersWhereUniqueInput,
    ): Promise<Users | null> {
        return this.prisma.users.findUnique({
            where: user
        })
    }

    async findAllUsers(params: {
        cursor?: Prisma.UsersWhereUniqueInput;
        where?: Prisma.UsersWhereInput;
        orderBy?: Prisma.UsersOrderByWithRelationInput;
    }): Promise<any> {
        const { cursor, where, orderBy } = params;

        return this.prisma.users.findMany({
            cursor,
            where,
            orderBy,
            select: {
                id: true,
                email: true,
                xp: true,
                name: true,
                code: false,
                JWT: false
            }
        });
    }

    async createNewUser(data: Prisma.UsersCreateInput): Promise<Users> {

        const { code } = data;

        const saltOrRounds = 10;
        const password = code;
        const hashCode = await bcrypt.hash(password, saltOrRounds);


        return this.prisma.users.create({
            data: {
                code: String(hashCode),
                email: data.email,
                JWT: data.JWT,
                name: data.name,
                xp: data.xp
            }
        });
    }

    async updateUser(params: {
        where: Prisma.UsersWhereUniqueInput;
        data: Prisma.UsersUpdateInput;
    }): Promise<Users> {
        const { where, data } = params;
        return this.prisma.users.update({
            data,
            where
        });
    }

    async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
        return this.prisma.users.delete({
            where,
        })
    }

    async login(where: Prisma.UsersWhereUniqueInput): Promise<any> {

        const { name, code } = where;

        const existUser = await this.prisma.users.findUnique({
            where: {
                name
            }
        });

        if (existUser) {

            const senhaMath = await bcrypt.compare(String(code), existUser.code);

            if (senhaMath) {

                const payload = { sub: existUser.id, username: existUser.name }
                const jwtToken = await this.jwtService.signAsync(payload);

                const updatedUser = await this.prisma.users.update({
                    where: {
                        id: existUser.id
                    },
                    data: {
                        JWT: jwtToken
                    }
                });

                if (updatedUser) {
                    const data = {
                        JWT: jwtToken,
                        id: updatedUser.id
                    }
                    return updatedUser;
                } else {
                    console.error("Falha ao atualizar o token JWT no banco de dados.");
                    return null;
                }

            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}