import { Body, Controller, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UsPluzzlesService } from "./uspluzzles.service";
import { Response } from "express";

@Controller()
export class UsPluzzlesController {

    constructor(
        private readonly usPluzzlesService: UsPluzzlesService
    ) { }

    @Put('userPluzzle/upsert/:idPluzzle/:idUser')
    async upsertXpOfUserInPluzzle(
        @Param('idUser') idUser: string,
        @Param('idPluzzle') idPluzzle: string,
        @Body() datauserPluzzle: { userId: number, pluzzleId: number, xp: number },
        @Res() res: Response
    ): Promise<Response> {

        const upsertInUserPluzzle =
            await this.usPluzzlesService.
                upsertXpOfUserInPluzzle({
                    where: {
                        userId: Number(idUser),
                        pluzzleId: Number(idPluzzle)
                    },
                    create: datauserPluzzle,
                    update: datauserPluzzle
                });

        if (upsertInUserPluzzle) {
            return res.status(HttpStatus.CREATED).json({ message: 'Xp atualizado com sucesso' });
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ops! Algo deu errado' });
        }

    }
}