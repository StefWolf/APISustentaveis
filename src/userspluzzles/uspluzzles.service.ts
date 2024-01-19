import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsPluzzlesService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async updateXpOfUserInPluzzle(params: {
        where: Prisma.UsersPluzzlesWhereUniqueInput;
        data: Prisma.UsersPluzzlesUpdateInput;
    }): Promise<any> {

        const { where, data } = params;

        const userPluzzle = await this.prisma.usersPluzzles.update({
            where,
            data
        })

        if (userPluzzle) {
            return userPluzzle;
        } else {
            return null;
        }
    }

    async createRelationUserInPluzzle(
        data: { pluzzle: any, user: any, xp: any }
    ): Promise<any> {

        const { pluzzle, user, xp } = data;

        try {

            const existRelation = await this.prisma.usersPluzzles.findMany({
                select: {
                    userId: user.id
                }
            })

            if (existRelation.length == 0) {
                const newRelation = await this.prisma.usersPluzzles.create({
                    data: {
                        userId: user?.id,
                        pluzzleId: pluzzle?.id,
                        xp
                    }
                })

                return newRelation;
            } else {
                return null;
            }

        } catch (err: any) {
            return null;
        }
    }
}