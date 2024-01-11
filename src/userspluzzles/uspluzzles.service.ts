import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsPluzzlesService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async upsertXpOfUserInPluzzle(params: {
        where: { userId: number; pluzzleId: number },
        create: any,
        update: Prisma.UsersPluzzlesUpdateInput
    }): Promise<any> {

        const { where, update, create } = params;

        const pluzzle = await this.prisma.pluzzles.findUnique({
            where: {
                id: where.pluzzleId
            }
        })

        const user = await this.prisma.users.findUnique({
            where: {
                id: where.userId
            }
        })

        const a: Prisma.UsersPluzzlesWhereUniqueInput = 

        const userPluzzle = await this.prisma.usersPluzzles.findUnique({
            where: {
                user,
                pluzzle
            }
        })

        return await this.prisma.usersPluzzles.upsert({
            create: {
                xp: create.xp,
                pluzzleId: create.pluzzleId,
                userId: create.userId   
            },
            update,
            where: {
                pluzzle: pluzzle,
                user: user
            }
        })

    }
}