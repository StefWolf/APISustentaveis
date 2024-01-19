import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpStatus,
    Res,
} from '@nestjs/common';

import { PluzzleService } from './pluzzles.service';
import { Response } from 'express';

@Controller()
export class PluzzleController {

    constructor(
        private readonly pluzzleService: PluzzleService
    ) { }

    @Get('pluzzle/:id')
    async getUniquePluzzle(
        @Param('id') id: string,
        @Res() res: Response
    ): Promise<Response> {

        const pluzzle = await this.pluzzleService.findUniquePluzzle({
            id: Number(id),
        })

        if (pluzzle != null) {
            return res.status(HttpStatus.FOUND).json({ message: 'Pluzzle encontrado com sucesso!', data: pluzzle })
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Pluzzle não encontrado' });
        }
    }

    @Get('pluzzles/')
    async getAllPluzzles(
        @Res() res: Response,
    ): Promise<Response> {

        return res.status(HttpStatus.FOUND).json(await this.pluzzleService.findAllPluzzles({},));
    }

    @Post('pluzzle/new')
    async createNewPluzzle(
        @Body() pluzzleData: { name: string },
        @Res() res: Response
    ): Promise<Response> {

        const createPluzzle = await this.pluzzleService.createNewPluzzle(pluzzleData);

        if (createPluzzle) {
            return res.status(HttpStatus.CREATED).json({ message: 'Pluzzle criado com sucesso!' });
        } else {
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ message: 'Ops! Ocorreu algum error ao cadastrar Pluzzle' });
        }
    }

    @Delete('pluzzle/delete/:id')
    async deletePluzzle(
        @Param('id') id: string,
        @Res() res: Response
    ): Promise<Response> {

        const deletePluzzle = await this.pluzzleService.deletePluzzle({ id: Number(id) })

        if (deletePluzzle) {
            return res.status(HttpStatus.MOVED_PERMANENTLY).json({ message: 'Pluzzle removido com sucesso!' });
        } else {
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ message: 'Ops! Ocorreu algum error ao cadastrar Pluzzle' });
        }

    }

    @Put('pluzzle/update/:id')
    async updatePluzzle(
        @Param('id') id: string,
        @Body() pluzzleData: { name: string },
        @Res() res: Response
    ): Promise<Response> {

        const pluzzleUpdated = await this.pluzzleService.updatePluzzle({ where: { id: Number(id) }, data: { name: pluzzleData.name } })

        if (pluzzleUpdated) {
            return res.status(HttpStatus.OK).json({ message: 'Pluzzle atualizado com sucesso!' })
        } else {
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ message: 'Ops! Ocorreu algum error ao cadastrar Pluzzle' });
        }
    }
}