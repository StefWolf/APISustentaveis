import { Injectable } from "@nestjs/common";
import { Pluzzles, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PluzzleService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findUniquePluzzle(pluzzle: Prisma.PluzzlesWhereUniqueInput): Promise<Pluzzles | null> {
        const pluzzleNow = await this.prisma.pluzzles.findUnique({
            where: {
                id: pluzzle.id
            }
        })

        if (pluzzle) {
            return pluzzleNow;
        } else {
            return null;
        }
    }

    async findAllPluzzles(params: {
        cursor?: Prisma.PluzzlesWhereUniqueInput;
        where?: Prisma.PluzzlesWhereInput;
        orderBy?: Prisma.PluzzlesOrderByWithRelationInput;
    }): Promise<any> {

        const { cursor, where, orderBy } = params;

        return this.prisma.pluzzles.findMany({
            where,
            cursor,
            orderBy,
            select: {
                name: true,
                id: true
            }
        })

    }

    async createNewPluzzle(
        data: Prisma.PluzzlesCreateInput
    ): Promise<any> {

        const newPluzzle = this.prisma.pluzzles.create({
            data: data
        })

        if (newPluzzle) {
            return newPluzzle
        } else {
            return null;
        }
    }

    async updatePluzzle(params: {
        where: Prisma.PluzzlesWhereUniqueInput;
        data: Prisma.PluzzlesUpdateInput;
    }): Promise<any> {

        const { where, data } = params;

        return this.prisma.pluzzles.update({
            data,
            where
        });

    }

    async deletePluzzle(where: Prisma.PluzzlesWhereUniqueInput): Promise<any> {
        return this.prisma.pluzzles.delete({
            where,
        })
    }

}
