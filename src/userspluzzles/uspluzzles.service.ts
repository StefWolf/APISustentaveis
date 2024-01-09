import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsPluzzles {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async updateXpOfUserInPluzzle(params: {
        where: Prisma.UsersPluzzlesWhereUniqueInput
        data: Prisma.UsersPluzzlesUpdateInput
    }): Promise<any> {

        const { where, data } = params;

        return await this.prisma.usersPluzzles.update({
            where,
            data
        })

    }
}