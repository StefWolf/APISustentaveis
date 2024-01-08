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

        const pluzzle = this.pluzzleService.findUniquePluzzle({
            id: Number(id),
        })

        if (pluzzle != null) {

        } else {
            return res.status(HttpStatus.NOT_FOUND).json({message: 'Pluzzle não encontrado'});
        }
    }
}